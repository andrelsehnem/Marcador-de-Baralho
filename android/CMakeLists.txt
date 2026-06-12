cmake_minimum_required(VERSION 3.22.1)

# Configuração global para evitar erro de CMAKE_OBJECT_PATH_MAX em pnpm paths
set(CMAKE_OBJECT_PATH_MAX 5000 CACHE STRING "Max object file path length")

project(MarcadorDeBaralho)
