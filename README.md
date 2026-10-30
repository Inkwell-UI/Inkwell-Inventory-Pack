# Inventory

An Inkwell node pack with the 15 nodes for an inventory menu replacement (On Key, On Attempt Equip, Item Select, Item Drop, Request Item Card, Play Sound and more). Pack id `inventory`; nodes are `inventory/<Kind>@1`. See `CHANGELOG.md` for the list.

They are contract nodes (`contract: "InventoryMenu"`): they only work in a menu replacement whose target contract is the inventory menu, and the editor refuses them anywhere else. They need no Inkwell Runtime. Their templates talk to the game only through `_root.inkwellContract` (`on`, `send`, `select`, `list`), which the editor generates for the replacement; this pack never creates it.

```
manifest.json        pack id, version, compatible tool range
nodes/<Kind>.json    one node definition per file
templates/<Kind>.as2 the AS2 each node generates
test/                node --test: templates agree with their pins and follow the contract rules
```

Commands (Inkwell-Core-Pack and Inkwell-Spec checked out next to this folder; run `yarn build` in Inkwell-Spec once): `yarn install`, `yarn validate`, `yarn test`.

Add it in the editor with Assets > Node packs > Add Pack and `owner/repo`. Release: bump `version` in `manifest.json`, add a `CHANGELOG.md` entry, push the tag `v<version>`.

Other menus get their own contract pack with the same layout.
