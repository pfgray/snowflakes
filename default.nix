{yarn2nix, mkYarnPackage, ...}: 
{
  build = mkYarnPackage rec {
    name = "snow";
    src = ./.;
    packageJSON = ./package.json;
    yarnLock = ./yarn.lock;
    distPhase = ''
      # pack command ignores cwd option
      rm -f .yarnrc
      cd $out/libexec/${name}/deps/${name}
      mkdir -p $out/tarballs/
      yarn pack --offline --filename $out/tarballs/snow.tgz
      ls -al $out/bin
      chmod +x $out/bin/snow
    '';
    dontFixup = true;
  };
}