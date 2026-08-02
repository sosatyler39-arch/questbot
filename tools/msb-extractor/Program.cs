using System.Text.Json;
using System.Text.RegularExpressions;
using SoulsFormats;

string gamePath = @"C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game";

// NpcName.fmg lives inside item.msgbnd.dcx, the same bundle Stage 1 found PlaceName.fmg in.
string itemMsgBndPath = Path.Combine(gamePath, "msg", "engus", "item.msgbnd.dcx");
BND4 itemMsgBnd = BND4.Read(itemMsgBndPath);
FMG npcNameFmg = FMG.Read(itemMsgBnd.Files.First(f => f.Name.EndsWith("NpcName.fmg", StringComparison.OrdinalIgnoreCase)).Bytes);
var npcNamesById = npcNameFmg.Entries
    .Where(e => !string.IsNullOrWhiteSpace(e.Text))
    .ToDictionary(e => e.ID, e => e.Text);

// Each locations.ts great-enemy pin, mapped to the exact NpcName.fmg display name to search for.
var pinToCreatureName = new Dictionary<string, string>
{
    ["Tree Sentinel (Limgrave)"] = "Tree Sentinel",
    ["Tibia Mariner (Limgrave site)"] = "Tibia Mariner",
    ["Flying Dragon Agheel (site)"] = "Flying Dragon Agheel",
    ["Erdtree Avatar (Weeping Peninsula site)"] = "Erdtree Avatar",
    ["Magma Wyrm Makar (site)"] = "Magma Wyrm Makar",
    ["Glintstone Dragon Smarag (site)"] = "Glintstone Dragon Smarag",
    ["Glintstone Dragon Adula (site)"] = "Glintstone Dragon Adula",
    ["Elder Dragon Greyoll (site)"] = "Elder Dragon Greyoll",
    ["Flying Dragon Greyoll (post-quest site)"] = "Flying Dragon Greyoll",
    ["Decaying Ekzykes (site)"] = "Decaying Ekzykes",
    ["Fallingstar Beast (site)"] = "Fallingstar Beast",
    ["Magma Wyrm (site)"] = "Magma Wyrm",
    ["Godskin Apostle (Dominula site)"] = "Godskin Apostle",
    ["Draconic Tree Sentinel (site)"] = "Draconic Tree Sentinel",
    ["Borealis the Freezing Fog (site)"] = "Borealis the Freezing Fog",
    ["Full-Grown Fallingstar Beast (site)"] = "Full-Grown Fallingstar Beast",
    ["Fire Giant (site)"] = "Fire Giant",
    ["Great Wyrm Theodorix (site)"] = "Great Wyrm Theodorix",
    ["Dragonlord Placidusax's Arena"] = "Dragonlord Placidusax",
};

// FromSoftware's nameId convention for these unique creatures: nameId = 90_{chrId:D4}_{suffix:D3}.
// Verified against Godrick (nameId=904750000 -> chr4750, cross-checked against Stormveil's real
// MSB Enemy part "c4750_9000") and against this game's own dragon-family clustering.
static int? DecodeChrId(int nameId)
{
    if (nameId < 900000000 || nameId > 999999999) return null;
    return (nameId % 10_000_000) / 1000;
}

var creatureChrIds = new Dictionary<string, HashSet<int>>();
foreach (var creatureName in pinToCreatureName.Values.Distinct())
{
    var set = new HashSet<int>();
    foreach (var kvp in npcNamesById)
    {
        if (kvp.Value.Equals(creatureName, StringComparison.OrdinalIgnoreCase))
        {
            var chrId = DecodeChrId(kvp.Key);
            if (chrId is int c) set.Add(c);
        }
    }
    creatureChrIds[creatureName] = set;
}

// Elder Dragon Greyoll / Flying Dragon Greyoll have no NpcName.fmg entry at all (verified: zero
// substring matches for "Greyoll" anywhere in that FMG). Fall back to EventTextForMap.fmg, in the
// same menu.msgbnd.dcx bundle, using the same exact-match technique.
foreach (var creatureName in new[] { "Elder Dragon Greyoll", "Flying Dragon Greyoll" })
{
    if (creatureChrIds[creatureName].Count > 0) continue;

    string menuMsgBndPath = Path.Combine(gamePath, "msg", "engus", "menu.msgbnd.dcx");
    BND4 menuMsgBnd = BND4.Read(menuMsgBndPath);
    var eventTextFmgFile = menuMsgBnd.Files.FirstOrDefault(f => f.Name.EndsWith("EventTextForMap.fmg", StringComparison.OrdinalIgnoreCase));
    if (eventTextFmgFile == null) continue;

    FMG eventTextFmg = FMG.Read(eventTextFmgFile.Bytes);
    foreach (var entry in eventTextFmg.Entries)
    {
        if (!string.IsNullOrWhiteSpace(entry.Text) && entry.Text.Equals(creatureName, StringComparison.OrdinalIgnoreCase))
        {
            var chrId = DecodeChrId(entry.ID);
            if (chrId is int c) creatureChrIds[creatureName].Add(c);
        }
    }
}

Console.WriteLine("--- Resolved chr IDs per creature ---");
foreach (var kvp in creatureChrIds)
{
    string marker = kvp.Value.Count == 0 ? "  *** UNRESOLVED ***" : "";
    Console.WriteLine($"  {kvp.Key}: {{{string.Join(", ", kvp.Value)}}}{marker}");
}

// Reverse lookup: chrId -> creature name(s). A chr ID can be shared by near-identical species
// (e.g. Glintstone Dragon Smarag and Adula both use chr4502) so this must be one-to-many.
var chrIdToCreatures = new Dictionary<int, List<string>>();
foreach (var kvp in creatureChrIds)
{
    foreach (var chrId in kvp.Value)
    {
        if (!chrIdToCreatures.TryGetValue(chrId, out var list))
        {
            list = new List<string>();
            chrIdToCreatures[chrId] = list;
        }
        list.Add(kvp.Key);
    }
}

// Scan every small-tile ("_00") MSB file for Enemy parts matching a target chr ID. "_10"/"_99"
// suffixed files are duplicate LOD/resolution variants of the same physical placement (same rule
// Stage 2's tileToWorld() applies) so they're skipped here rather than producing duplicate hits.
string mapStudioDir = Path.Combine(gamePath, "map", "mapstudio");
var nameChrPattern = new Regex(@"^c(\d{4})_", RegexOptions.Compiled);
var candidatesByCreature = new Dictionary<string, List<(string mapTileId, string partName, float x, float y, float z)>>();
foreach (var creatureName in creatureChrIds.Keys)
{
    candidatesByCreature[creatureName] = new List<(string, string, float, float, float)>();
}

int filesScanned = 0;
foreach (var msbPath in Directory.GetFiles(mapStudioDir, "*.msb.dcx"))
{
    string mapTileId = Path.GetFileNameWithoutExtension(Path.GetFileNameWithoutExtension(msbPath));
    if (!mapTileId.EndsWith("_00")) continue;

    MSBE msb;
    try { msb = MSBE.Read(msbPath); }
    catch { continue; }
    filesScanned++;

    foreach (var enemy in msb.Parts.Enemies)
    {
        var match = nameChrPattern.Match(enemy.Name);
        if (!match.Success) continue;
        int chrId = int.Parse(match.Groups[1].Value);
        if (!chrIdToCreatures.TryGetValue(chrId, out var creatureNames)) continue;

        foreach (var creatureName in creatureNames)
        {
            candidatesByCreature[creatureName].Add((mapTileId, enemy.Name, enemy.Position.X, enemy.Position.Y, enemy.Position.Z));
        }
    }
}

Console.WriteLine($"\nScanned {filesScanned} small-tile MSB files.");
Console.WriteLine("\n--- Raw candidates per creature ---");
foreach (var kvp in candidatesByCreature)
{
    Console.WriteLine($"  {kvp.Key}: {kvp.Value.Count} candidate(s)");
}

var output = pinToCreatureName.Select(kvp => new
{
    pinName = kvp.Key,
    creatureName = kvp.Value,
    chrIds = creatureChrIds[kvp.Value].ToArray(),
    candidates = candidatesByCreature[kvp.Value].Select(c => new
    {
        mapTileId = c.mapTileId,
        partName = c.partName,
        localX = c.x,
        localY = c.y,
        localZ = c.z,
    }).ToArray(),
}).ToArray();

Directory.CreateDirectory("output");
string outputPath = Path.Combine("output", "great-enemy-candidates.json");
File.WriteAllText(outputPath, JsonSerializer.Serialize(output, new JsonSerializerOptions { WriteIndented = true }));
Console.WriteLine($"\nWrote {output.Length} pin entries to {outputPath}");
