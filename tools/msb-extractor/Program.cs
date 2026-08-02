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
foreach (var g in graceCandidates.Take(3))
{
    Console.WriteLine($"  entityId={g.EntityId} tile=m{g.AreaNo:D2}_{g.GridXNo:D2}_{g.GridZNo:D2} posX={g.PosX} posZ={g.PosZ} textId={g.TextId}");
}
