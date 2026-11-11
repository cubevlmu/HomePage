export const manifestExample = [
  'package("ExampleApp")',
  'version("0.1.0")',
  'default_config("debug")',
  'default_platform("host")',
  'default_arch("x64")',
  '',
  'require("fmt", {',
  '    source = "https://github.com/fmtlib/fmt.git",',
  '    ref = "10.2.1",',
  '    build = "cmake",',
  '    cmake = { options = { FMT_DOC = false, FMT_TEST = false } },',
  '    artifacts = { include_dirs = {"include"}, libs = {"fmt"} }',
  '})',
].join('\n')

export const commandExample = [
  'rhodium doctor',
  'rhodium sdk detect',
  'rhodium sdk list',
  'rhodium restore --config debug --toolchain windows-msvc-x64',
  'rhodium generate --config debug --toolchain windows-msvc-x64',
].join('\n')

export const cmakeExample = [
  'cmake_minimum_required(VERSION 3.25)',
  'project(ExampleApp LANGUAGES CXX)',
  '',
  'include("CMAKE_DIRECTORY_TOKEN/.rhodium/generated/cmake/rhodiumConfig.cmake")',
  '',
  'add_executable(example src/main.cpp)',
  'target_link_libraries(example PRIVATE fmt)',
].join('\n').replace('CMAKE_DIRECTORY_TOKEN', '$' + '{CMAKE_SOURCE_DIR}')
