# Local Content Share (SolidJS V2 Version)

A simple self-hosted app for sharing files over local network, inspired by [Local Content Share](https://github.com/Tanq16/local-content-share).

Only file sharing is implemented, the following features are cut off:
- share plain text snippets
- store links
- builtin notepad
- expiration
- file updates informed by SSE

The following behavior is changed on purpose:
- unicode characters aren't repalecd
- delete file do not confirm
