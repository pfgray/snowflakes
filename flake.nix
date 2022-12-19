{
  description = "A Snowflake generator";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      snow = pkgs.callPackage ./. {};
    in {
      devShell = pkgs.mkShell {
        packages = [
          pkgs.nodejs
        ];
      };
      packages = {
        snow = builtins.trace (builtins.attrNames snow.build) snow.build;
      };
      apps.snow = flake-utils.lib.mkApp {
        drv = snow.build;
      };
    });
}
