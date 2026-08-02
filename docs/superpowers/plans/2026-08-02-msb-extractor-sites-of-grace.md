# MSB Extractor: Sites of Grace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce `tools/msb-extractor/output/sites-of-grace.json` — real, verified Elden Ring
Site of Grace coordinates extracted from the user's own game files.

**Architecture:** A new C#/.NET console app in `tools/msb-extractor/`, referencing
`soulsmods/SoulsFormatsNEXT` (vendored as a git submodule) to read `regulation.bin`
(`BonfireWarpParam` → grace names, via an FMG text lookup) and every overworld MSB tile
(`EventParam.RetryPoints` → `EntityID` join → `Region.Position`).

**Tech Stack:** C#, .NET (version confirmed during Task 1's install step), `SoulsFormatsNEXT`
(GPL-3.0, run locally only — see the design spec's licensing rationale).

## Global Constraints

- Run locally only against the user's own legally-owned game copy — never distributed, never
  commits the game's own files (only our derived coordinate output) to this repo.
- Fail loudly on any unexpected condition (missing file, decrypt failure, empty param table) —
  no silent partial/wrong output, per the design spec's error-handling section.
- No other location categories yet — Sites of Grace only, per the design spec's scope boundary.

## Important note on library API uncertainty

`SoulsFormatsNEXT`'s exact method signatures for a few pieces (regulation.bin decryption
specifically) could not be confirmed from GitHub web-fetches alone during design — one
candidate method name researched (`SFUtil.DecryptERRegulation`) turned out to belong to a
*different* project (DSAnimStudio), not this library. **Task 2 starts by reading the actual
vendored source on disk** (reliable — it's a local file at that point, not a web fetch) to
confirm the real approach before writing extraction code, exactly like this project's established
practice of verifying real data shapes before writing decode logic against them. Where this plan
gives a concrete method name, it's been confirmed against the library's real source during
design (see the design spec); where it hasn't been possible to confirm from outside the repo
(regulation decryption specifically), the step says so explicitly and provides a verified-safe
fallback (raw AES-CBC via .NET's own `System.Security.Cryptography.Aes`, which needs no
unverified library helper at all).

---

## File Structure

**Create:**
- `tools/msb-extractor/msb-extractor.csproj` — the console app project file.
- `tools/msb-extractor/Program.cs` — the whole tool (single file is appropriate for this narrow,
  one-shot extraction script).
- `tools/msb-extractor/paramdefs/BonfireWarpParam.xml` — vendored copy of the one paramdef file
  needed to read `BonfireWarpParam`'s field layout (from `soulsmods/Paramdex`, MIT-adjacent
  param-resource repo — just this one file, not the whole repo, since that's all this tool
  needs).
- `tools/msb-extractor/vendor/SoulsFormatsNEXT/` — git submodule.
- `tools/msb-extractor/output/sites-of-grace.json` — the deliverable (produced by running the
  tool, not hand-written).
- `tools/msb-extractor/README.md` — how to run it and against what game path, so this isn't a
  mystery script six months from now.

---

### Task 1: Project scaffold + .NET SDK + SoulsFormatsNEXT submodule

**Files:**
- Create: `tools/msb-extractor/msb-extractor.csproj`
- Create: `tools/msb-extractor/Program.cs` (trivial placeholder for this task only)
- Create: `.gitmodules` (modified by `git submodule add`)

**Interfaces:**
- Produces: a buildable console app skeleton with `SoulsFormatsNEXT` referenced, that later
  tasks add real logic to.

- [ ] **Step 1: Install the .NET SDK**

Confirmed via `dotnet --version` during brainstorming: no .NET SDK is installed on this machine.
Install the latest LTS SDK from `https://dotnet.microsoft.com/download` (or via
`winget install Microsoft.DotNet.SDK.8` if winget is available), then verify:

Run: `dotnet --version`
Expected: prints a version number (8.x or later), not an error.

- [ ] **Step 2: Scaffold the console project**

```bash
mkdir -p tools/msb-extractor
cd tools/msb-extractor
dotnet new console
```

Expected: creates `msb-extractor.csproj` and a default `Program.cs`.

- [ ] **Step 3: Add SoulsFormatsNEXT as a git submodule**

From the repo root:

```bash
git submodule add https://github.com/soulsmods/SoulsFormatsNEXT.git tools/msb-extractor/vendor/SoulsFormatsNEXT
```

Expected: creates/updates `.gitmodules` and clones the library into
`tools/msb-extractor/vendor/SoulsFormatsNEXT`.

- [ ] **Step 4: Reference it from the console project**

Find the actual `.csproj` file inside the cloned submodule (its exact path/name — check
`tools/msb-extractor/vendor/SoulsFormatsNEXT/` directly, since this plan can't assume the
project file's exact name without it being cloned first) and add a `<ProjectReference>` to it
in `tools/msb-extractor/msb-extractor.csproj`:

```xml
<ItemGroup>
  <ProjectReference Include="vendor/SoulsFormatsNEXT/<actual-project-file-found-in-step-4>.csproj" />
</ItemGroup>
```

- [ ] **Step 5: Write a trivial smoke-test Program.cs**

```csharp
using SoulsFormats;

Console.WriteLine("SoulsFormatsNEXT referenced OK: " + typeof(MSBE).FullName);
```

- [ ] **Step 6: Build and run**

Run: `dotnet run` (from `tools/msb-extractor/`)
Expected: prints `SoulsFormatsNEXT referenced OK: SoulsFormats.MSBE` (or whatever the fully
qualified name actually resolves to) with no build errors. If the namespace or type name
differs from `SoulsFormats.MSBE`, adjust based on the actual compiler error/IntelliSense —
this step's whole purpose is confirming the reference wiring works before building real logic
on top of it.

- [ ] **Step 7: Commit**

```bash
git add .gitmodules tools/msb-extractor/msb-extractor.csproj tools/msb-extractor/Program.cs
git commit -m "Scaffold the MSB extraction tool and vendor SoulsFormatsNEXT"
```

(The submodule's own contents aren't committed as regular files — `.gitmodules` plus the
submodule's commit reference is all git tracks for it.)

---

### Task 2: Read `regulation.bin` → `BonfireWarpParam` rows

**Files:**
- Modify: `tools/msb-extractor/Program.cs`
- Create: `tools/msb-extractor/paramdefs/BonfireWarpParam.xml`

**Interfaces:**
- Consumes: the confirmed game path
  `C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game\regulation.bin`.
- Produces: for Task 3, a way to get `{ bonfireEntityId (uint), textId (int), textType (string)
  }` for every `BonfireWarpParam` row where `textType` indicates a place name (confirmed during
  design: the paramdef defines 8 text-reference slots per row, each with its own `textType`
  enum — filter to whichever slot(s) are typed as place-name references).

- [ ] **Step 1: Vendor the paramdef**

Download `https://raw.githubusercontent.com/soulsmods/Paramdex/master/ER/Defs/BonfireWarpParam.xml`
and save it to `tools/msb-extractor/paramdefs/BonfireWarpParam.xml`.

- [ ] **Step 2: Read the vendored SoulsFormatsNEXT source directly to confirm the regulation-reading approach**

Open (via a normal file read, now that it's cloned locally) these files under
`tools/msb-extractor/vendor/SoulsFormatsNEXT/`:
- The `PARAM` format folder (`SoulsFormats/Formats/PARAM/`) — find the class for reading a
  `.bin`/`.param` file and applying a paramdef (`ApplyParamdef` or similarly named method were
  referenced during design research, but confirm the exact name from the real source).
- Search for `BND4` (`SoulsFormats/Formats/BND4.cs` or similar) — regulation.bin is a `BND4`
  archive once decrypted, containing individual PARAM files inside it.
- Search the whole vendored source for "regulation" (case-insensitive) — if a purpose-built
  helper for Elden Ring's regulation file exists in this library, it'll turn up here directly;
  if nothing turns up, fall back to Step 3's manual approach.

- [ ] **Step 3: Decrypt `regulation.bin` (fallback approach if no library helper exists)**

Elden Ring's regulation.bin is AES-256-CBC encrypted with a publicly-documented key, the same
one used by every current-generation FromSoftware modding tool (confirmed during design
research — not a secret, the standard interoperability constant for this file format):

```csharp
using System.Security.Cryptography;

// This 32-byte (64 hex char) key was found via a single web search during design, not a
// direct fetch of verified source code — re-derive/cross-check it against a primary source
// (e.g. WitchyBND's own published source, which needs this same key to function at all)
// before trusting it. A wrong key decrypts to garbage silently rather than failing loudly, so
// this specific value must be confirmed, not assumed, before moving past this step.
byte[] regulationKey = Convert.FromHexString("99bffc366a6bc8c6f5827d093602d676c42892a01c207fb024d3af4e493fef99");

byte[] encrypted = File.ReadAllBytes(@"C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game\regulation.bin");
// Elden Ring's regulation.bin format: first 16 bytes are the IV, remainder is AES-CBC
// ciphertext (confirm this exact layout against a primary source alongside the key above).
using var aes = Aes.Create();
aes.Key = regulationKey;
aes.Mode = CipherMode.CBC;
aes.Padding = PaddingMode.None;
byte[] iv = encrypted[..16];
byte[] ciphertext = encrypted[16..];
using var decryptor = aes.CreateDecryptor(regulationKey, iv);
byte[] decrypted = decryptor.TransformFinalBlock(ciphertext, 0, ciphertext.Length);
// `decrypted` should now be readable as a BND4 archive via SoulsFormatsNEXT's BND4 reader.
```

- [ ] **Step 4: Load `BonfireWarpParam` from the decrypted BND4 using the vendored paramdef**

Exact code depends on Step 2's findings — using whatever `PARAM.Read()` /
`ApplyParamdef()`-equivalent API the real source exposes, load the `BonfireWarpParam` entry
from the decrypted BND4 archive and apply `tools/msb-extractor/paramdefs/BonfireWarpParam.xml`
to it so rows are accessible by field name rather than raw byte offset.

- [ ] **Step 5: Run and verify against real output**

Print the row count and the first 3 rows' `bonfireEntityId` + raw text-slot values to the
console.

Run: `dotnet run`
Expected: a plausible row count (order of magnitude matching Elden Ring's known ~250 Sites of
Grace — not exact, just sane), no exceptions. If decryption fails, the AES key/IV assumption in
Step 3 is wrong — stop and re-verify against a primary source rather than guessing further.

- [ ] **Step 6: Commit**

```bash
git add tools/msb-extractor/Program.cs tools/msb-extractor/paramdefs/BonfireWarpParam.xml
git commit -m "Read BonfireWarpParam rows from regulation.bin"
```

---

### Task 3: Resolve grace display names via the `PlaceName` FMG

**Files:**
- Modify: `tools/msb-extractor/Program.cs`

**Interfaces:**
- Consumes: Task 2's `BonfireWarpParam` rows (each with a place-name `textId`).
- Produces: for Task 4, a `Dictionary<uint, string>` mapping `bonfireEntityId → graceName`.

- [ ] **Step 1: Locate the FMG**

Confirmed directly against the real unpacked game files during design: English text bundles
live under `msg\engus\`, including `menu.msgbnd.dcx` — the conventional home for `PlaceName.fmg`
(confirm by actually reading the bundle's contents in Step 2, not by assuming the filename
inside it).

- [ ] **Step 2: Read the vendored source for the BND4 + FMG reading API**

Same discipline as Task 2 Step 2 — check `tools/msb-extractor/vendor/SoulsFormatsNEXT/` for
`FMG.cs` (likely under `SoulsFormats/Formats/`) to confirm its read method and how entries are
exposed (an indexed `Dictionary<int, string>`-like structure keyed by text ID is the standard
FMG shape across every FromSoftware game).

- [ ] **Step 3: Open the bundle, extract `PlaceName.fmg`, resolve names**

Read `msg\engus\menu.msgbnd.dcx` via the library's BND4 (and DCX decompression, since `.dcx` is
a compressed wrapper) reader, find the entry named `PlaceName.fmg` inside it, parse it as an
`FMG`, and for each `BonfireWarpParam` row from Task 2, look up its place-name `textId` in the
FMG to get the grace's real display name. Store the result in a variable named
`graceNamesByEntityId` (type `Dictionary<uint, string>`, keyed by `bonfireEntityId`) — Task 4
references this exact name.

- [ ] **Step 4: Run and verify against real, recognizable output**

Print `{ bonfireEntityId, graceName }` for the first 10 resolved entries.

Run: `dotnet run`
Expected: recognizable real grace names (e.g. "The First Step," "Church of Elleh") — if names
come back blank or garbled, the `textType` filter from Task 2 or the FMG lookup key is wrong;
stop and re-check against the paramdef and real FMG contents rather than guessing further.

- [ ] **Step 5: Commit**

```bash
git add tools/msb-extractor/Program.cs
git commit -m "Resolve grace display names via the PlaceName FMG"
```

---

### Task 4: Walk overworld MSB tiles, join `RetryPoint` events to their `Region` position

**Files:**
- Modify: `tools/msb-extractor/Program.cs`

**Interfaces:**
- Consumes: Task 3's `{ bonfireEntityId → graceName }` dictionary.
- Produces: for Task 5, a list of
  `{ graceName, bonfireEntityId, mapTileId, localX, localY, localZ }` for every grace resolved
  to a real overworld position.

- [ ] **Step 1: Enumerate the overworld MSB tiles**

```csharp
string mapStudioDir = @"C:\Program Files (x86)\Steam\steamapps\common\ELDEN RING\Game\map\mapstudio";
var tileFiles = Directory.GetFiles(mapStudioDir, "m60_*.msb.dcx");
// Confirmed during design: overworld tiles are named "m60_X_Y_RES" — legacy dungeons and other
// non-grid maps use different prefixes (m10, m11, etc.) and are deliberately excluded here,
// since this pipeline only places entities that have a real overworld position.
```

- [ ] **Step 2: For each tile, read it and check its `RetryPoints`**

```csharp
var graceResults = new List<(string graceName, uint entityId, string mapTileId, float x, float y, float z)>();

foreach (var tileFile in tileFiles)
{
    var msb = MSBE.Read(tileFile); // confirmed signature during design (SoulsFile<MSBE>.Read)
    var mapTileId = Path.GetFileName(tileFile).Split('.')[0]; // "m60_43_36_00"

    var allRegions = msb.Regions.GetEntries().ToDictionary(r => r.Name); // confirmed public method during design

    foreach (var retryPoint in msb.Events.RetryPoints)
    {
        if (!graceNamesByEntityId.TryGetValue(retryPoint.EntityID, out var graceName)) continue;
        if (!allRegions.TryGetValue(retryPoint.RetryRegionName, out var region)) continue; // interior/non-overworld grace — skip, expected

        graceResults.Add((graceName, retryPoint.EntityID, mapTileId, region.Position.X, region.Position.Y, region.Position.Z));
    }
}
```

(`allRegions.ToDictionary` assumes unique region names within a single tile — if
`ToDictionary` throws on a duplicate key, region names aren't guaranteed unique per-tile; switch
to `GroupBy` and take the first match, logging a warning, rather than silently picking one.)

- [ ] **Step 3: Run and verify counts**

Print the total `graceResults.Count` and the count of graces from Task 3 that were *not* found
in any overworld tile (expected — those are interior graces).

Run: `dotnet run`
Expected: `graceResults.Count` plus the not-found count roughly equals Task 3's total grace
count; a large unexplained gap (neither found nor accounted for) signals a bug in the join
logic, not a legitimate "interior grace," and needs investigating before moving on.

- [ ] **Step 4: Commit**

```bash
git add tools/msb-extractor/Program.cs
git commit -m "Join RetryPoint events to their Region position across overworld tiles"
```

---

### Task 5: Write the output JSON + real-data verification

**Files:**
- Create: `tools/msb-extractor/output/sites-of-grace.json` (generated, not hand-written)
- Create: `tools/msb-extractor/README.md`

**Interfaces:**
- Produces: `tools/msb-extractor/output/sites-of-grace.json`, the deliverable Stage 2 of the
  overview pipeline consumes next.

- [ ] **Step 1: Serialize the results**

```csharp
using System.Text.Json;

var output = graceResults.Select(r => new
{
    graceName = r.graceName,
    bonfireEntityId = r.entityId,
    mapTileId = r.mapTileId,
    localX = r.x,
    localY = r.y,
    localZ = r.z,
});

Directory.CreateDirectory("output");
File.WriteAllText("output/sites-of-grace.json", JsonSerializer.Serialize(output, new JsonSerializerOptions { WriteIndented = true }));
Console.WriteLine($"Wrote {graceResults.Count} sites of grace to output/sites-of-grace.json");
```

- [ ] **Step 2: Run for real**

Run: `dotnet run` (from `tools/msb-extractor/`)
Expected: `output/sites-of-grace.json` created, count printed matches Task 4's verified count.

- [ ] **Step 3: Real-data smoke check against a public reference**

Open `output/sites-of-grace.json` and find "The First Step" and "Church of Elleh" (both very
early, well-known Limgrave graces). Cross-check their `mapTileId` falls within Limgrave's known
tile range — cross-reference against a public grace-location guide (e.g. powerpyx.com's Sites
of Grace list, checked during design) for which general area each grace is in, confirming the
extracted tile matches the real-world area, not just that *a* value was produced.

- [ ] **Step 4: Write the tool's README**

```markdown
# MSB Extractor: Sites of Grace

Extracts real Elden Ring Site of Grace coordinates from your own game files. Run locally only —
never distributes game data, only the coordinates you generate from a copy you own.

## Requirements
- .NET SDK (8.0+)
- Elden Ring installed and UXM-unpacked (loose `regulation.bin`, `map/mapstudio/`, and
  `msg/engus/` present alongside the original archives)

## Usage

Edit the game path constant at the top of `Program.cs` if your install isn't at the default
Steam location, then:

\`\`\`bash
dotnet run
\`\`\`

Output: `output/sites-of-grace.json`.
```

- [ ] **Step 5: Commit**

```bash
git add tools/msb-extractor/output/sites-of-grace.json tools/msb-extractor/README.md
git commit -m "Write Sites of Grace extraction output and tool README"
```
