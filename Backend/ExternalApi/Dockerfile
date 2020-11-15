#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["ExternalApi/ExternalApi.csproj", "ExternalApi/"]
RUN dotnet restore "ExternalApi/ExternalApi.csproj"
COPY . .
WORKDIR "/src/ExternalApi"
RUN dotnet build "ExternalApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ExternalApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ExternalApi.dll"]