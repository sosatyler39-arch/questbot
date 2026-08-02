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
foreach (var kv in graceNamesByEntityId.Take(10))
{
    Console.WriteLine($"  entityId={kv.Key} name=\"{kv.Value}\"");
}
