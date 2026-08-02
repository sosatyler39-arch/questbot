using System.Text.Json;
using SoulsFormats;
using SoulsFormats.Cryptography;

const string GamePath = @"C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game";

// --- Task 2: read regulation.bin -> BonfireWarpParam rows ---

BND4 regulationBnd = RegulationDecryptor.DecryptERRegulation(Path.Combine(GamePath, "regulation.bin"));

BinderFile? bonfireWarpParamFile = regulationBnd.Files.FirstOrDefault(f => f.Name.Contains("BonfireWarpParam"));
if (bonfireWarpParamFile is null)
{
    throw new InvalidOperationException("BonfireWarpParam not found in regulation.bin - the game version may have changed.");
}

PARAMDEF bonfireWarpParamDef = PARAMDEF.XmlDeserialize("paramdefs/BonfireWarpParam.xml");
PARAM bonfireWarpParam = PARAM.Read(bonfireWarpParamFile.Bytes);
bonfireWarpParam.ApplyParamdef(bonfireWarpParamDef);

Console.WriteLine($"BonfireWarpParam rows: {bonfireWarpParam.Rows.Count}");

// Each row's display name comes from whichever of its 8 text slots is actually populated
// (not -1) - graces have exactly one real name slot in practice, so the first valid one found
// is taken as the name reference; the exact WORLD_MAP_POINT_TEXT_TYPE enum value isn't needed
// for this since we're not disambiguating between multiple simultaneously-valid slots.
static int? FirstValidTextId(PARAM.Row row)
{
    for (int i = 1; i <= 8; i++)
    {
        int textId = (int)row[$"textId{i}"].Value;
        if (textId != -1) return textId;
    }
    return null;
}

var graceCandidates = bonfireWarpParam.Rows
    .Select(row => new
    {
        EntityId = (uint)row["bonfireEntityId"].Value,
        AreaNo = (byte)row["areaNo"].Value,
        GridXNo = (byte)row["gridXNo"].Value,
        GridZNo = (byte)row["gridZNo"].Value,
        PosX = (float)row["posX"].Value,
        PosZ = (float)row["posZ"].Value,
        TextId = FirstValidTextId(row),
    })
    .Where(g => g.TextId is not null)
    .ToList();

Console.WriteLine($"Rows with a resolvable text ID: {graceCandidates.Count}");

// --- Task 3: resolve grace display names via the PlaceName FMG ---

// PlaceName.fmg is confirmed to live in item.msgbnd.dcx (not menu.msgbnd.dcx, despite "place
// name" sounding menu-related) - found by scanning every English message bundle for the FMG
// whose entry IDs actually overlap grace textIds (100000s); EventTextForMap.fmg and
// GR_MenuText.fmg in menu.msgbnd.dcx were both tried first and ruled out (wrong ID range /
// coincidental garbage matches on unrelated UI strings).
BND4 itemMsgBnd = BND4.Read(Path.Combine(GamePath, "msg", "engus", "item.msgbnd.dcx"));
BinderFile? placeNameFile = itemMsgBnd.Files.FirstOrDefault(f => f.Name.Contains("PlaceName"));
if (placeNameFile is null)
{
    throw new InvalidOperationException("PlaceName.fmg not found in item.msgbnd.dcx - check the bundle's actual contents.");
}

FMG placeNameFmg = FMG.Read(placeNameFile.Bytes);
Dictionary<int, string> placeNamesByTextId = placeNameFmg.Entries.ToDictionary(e => e.ID, e => e.Text ?? string.Empty);

Dictionary<uint, string> graceNamesByEntityId = graceCandidates
    .Where(g => placeNamesByTextId.ContainsKey(g.TextId!.Value))
    .ToDictionary(g => g.EntityId, g => placeNamesByTextId[g.TextId!.Value]);

Console.WriteLine($"Resolved grace names: {graceNamesByEntityId.Count}");

// --- Task 5: write the output JSON ---

// posY is deliberately omitted: BonfireWarpParam's own paramdef documents it as "not used"
// (see tools/msb-extractor/paramdefs/BonfireWarpParam.xml), so including it would present
// meaningless data as if it were real - this simpler param-only path never touches the MSB
// Region.Position that would have supplied a real height value (see the README's note on why
// the original MSB-walk approach turned out to be unnecessary for this category).
var output = graceCandidates
    .Where(g => graceNamesByEntityId.ContainsKey(g.EntityId))
    .Select(g => new
    {
        graceName = graceNamesByEntityId[g.EntityId],
        bonfireEntityId = g.EntityId,
        mapTileId = $"m{g.AreaNo:D2}_{g.GridXNo:D2}_{g.GridZNo:D2}_00",
        localX = g.PosX,
        localZ = g.PosZ,
    })
    .ToList();

Directory.CreateDirectory("output");
File.WriteAllText("output/sites-of-grace.json", JsonSerializer.Serialize(output, new JsonSerializerOptions { WriteIndented = true }));
Console.WriteLine($"Wrote {output.Count} sites of grace to output/sites-of-grace.json");
