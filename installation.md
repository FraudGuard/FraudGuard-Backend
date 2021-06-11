# 1. Installation der Release-Version

## 1.1. Vorraussetzungen

Zunächst muss **Docker Desktop** auf der lokalen Maschine installiert sein. Unter windows muss dazu ggf. ein Linux subsystem installiert werden (siehe https://docs.microsoft.com/de-de/windows/wsl/install-win10).
Im Projekt genutzte Version:

- docker version 20.10.7

Die korrekte Installation und Version des Services kann folgendermaßen überprüft werden:

```
docker --version
```

## Installation der Packages

Um den Container herunterzuladen zu können muss der docker agent gestartet sein und eine Internetverbindung bestehen. Das Herunterladen der neusten Version erfolgt dann über diesen Befehl:

```
docker pull eu.gcr.io/fraudguard/backend:latest
```

## Ausführen der Releaseversion

Der heruntergeladene Container kann mit

```
docker run -p 4200:4200 gcr.io/fraudgaurd/backend:latest
```

ausgeführt werden und auf [http://localhost:4200](http://localhost:4200) aufgerufen werden

# 2. Weiterentwickeln

## Herunterladen des Sourcecodes von [Github.com](https://github.com/FraudGuard/FraudGuard-Backend)

Für die Weiterentwicklung des Prototyps muss man das Repository klonen. Hier drinnem befindet sich auch ein Dockerfile zum bauen eines Containers, um das Hosten einfacher zu gestalten. Das Herunterladen erfolgt mit:

```
git clone https://github.com/FraudGuard/FraudGuard-Backend.git
```

## Ausführung

Dazu muss zunächst mit einer CMD/Terminal/Powershell/Kommandozeile in den Projektordner navigiert werden. Danach kann das Projekt mit

```
docker run -p 4200:4200 gcr.io/fraudgaurd/backend:latest
```

oder mit

```
npm run start:dev
```

gestartet werden. Möchte man anstatt den Container den Sourcecode starten muss man erst die Abhängigkeiten mit `npm install` herunterladen. Mit der Tastenkombination `STRG+C` wird ein Shutdown-Kommando an alle Komponenten des Stacks gesendet.

Die Anwendung kann unter [http://localhost:4200](http://localhost:4200) direkt ausprobiert werden.

## Build-Prozess & Deployment

Das Aktualisieren geschieht automatisch, wenn man ein neues Docker-Image baut und dies in die Cloud hochlädt. Die neue Version sollte nach Ausführen der beiden Befehle in 5 Minuten live sein.

```
npm run docker:build
```

```
npm run docker:push
```
