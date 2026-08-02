# MSB Extractor: Sites of Grace

Extracts real Elden Ring Site of Grace coordinates from your own game files. Run locally only —
never distributes game data, only the coordinates you generate from a copy you own.

## Requirements

- .NET SDK (9.0+ — matches `SoulsFormatsNEXT`'s target framework)
- Elden Ring installed and UXM-unpacked (loose `regulation.bin`, `map/mapstudio/`, and
  `msg/engus/` present alongside the original archives)
- The game's own `oo2core_6_win64.dll` (Oodle compression library), copied into this directory
  and into `bin/Debug/net9.0/` after each build — it's proprietary game binary, so it's
  gitignored and never committed; copy it fresh from your own game install
  (`<game>/Game/oo2core_6_win64.dll`)

## Usage

Edit the `GamePath` constant at the top of `Program.cs` if your install isn't at the default
Steam location, then:

```bash
dotnet build
./bin/Debug/net9.0/msb-extractor.exe
```

(Run the `.exe` directly, not `dotnet run`/`dotnet <dll>` — the native Oodle DLL is only found
relative to the apphost executable's own directory, not `dotnet.exe`'s.)

Output: `output/sites-of-grace.json`.

## How it works

Sites of Grace turned out to be simpler to extract than originally planned. The design assumed
positions would come from walking every overworld MSB tile and joining `RetryPoint` events to
their `Region` position by `EntityID`. In practice, `BonfireWarpParam` (a table inside
`regulation.bin`) already carries each grace's tile (`areaNo`/`gridXNo`/`gridZNo`, i.e. the
`mAA_BB_CC_DD` grid) and local position (`posX`/`posZ`) directly — no MSB parsing needed at all
for this category. `posY` is deliberately omitted from the output: the param's own definition
documents it as "not used," so it's not a real height value.

Each row's display name comes from resolving its text ID against `PlaceName.fmg` — which lives
in `msg/engus/item.msgbnd.dcx`, not the more intuitively-named `menu.msgbnd.dcx` (found by
scanning every English message bundle for the one whose entry IDs actually matched).

Not every `BonfireWarpParam` row is a real, placeable grace — some don't resolve to a place name
at all (they're likely other kinds of Elden Ring warp/UI markers sharing the same param table),
which is why the output count (314) is lower than the row count (422).
