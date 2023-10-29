#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
RUN apt update -y && apt -y upgrade 
RUN apt-get -y install ffmpeg


WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["WorkPomodoro_API/WorkPomodoro_API.csproj", "WorkPomodoro_API/"]
RUN dotnet restore "WorkPomodoro_API/WorkPomodoro_API.csproj"
COPY . .
WORKDIR "/src/WorkPomodoro_API"
RUN dotnet build "WorkPomodoro_API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WorkPomodoro_API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WorkPomodoro_API.dll"]