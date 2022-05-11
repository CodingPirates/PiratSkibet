{ pkgs ? import <nixpkgs> {}
}:
with import <nixpkgs> {};

let
  nixpkgs-20-03 = import <nixos-20.03> {};
  nixpkgs-21-05 = import <nixos-21.05> {};
in
mkShell {
  buildInputs = [
    nixpkgs-21-05.php74Packages.composer
    nixpkgs-21-05.php
    nixpkgs-20-03.nodePackages.npm
    nixpkgs-21-05.nodejs
    nixpkgs-20-03.pgloader
    nixpkgs-21-05.heroku
    nixpkgs-21-05.mysql80
  ];
}
