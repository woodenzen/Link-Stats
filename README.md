# Example Plug-In for The Archive

This repository provides an example "Hello World" plug-in for [The Archive](https://zettelkasten.de/the-archive/). It includes the necessary folder and file structure along with helpful tips on handling releases.

## Getting Started

To create your own plug-in:

1. **Copy, clone, or fork this repository.**
2. **Customize it to your needs.**
3. **Build and test your plug-in.**
4. **Share your plug-in with others.**

### Customization

- **Rename Your Plug-In**: Choose a name for your plug-in and update it in the manifest file.
- **Set a Unique Identifier**: Define a unique identifier in the format `com.example.plugin-name` and specify it in the manifest file. Ensure the folder name matches this identifier, e.g., `com.example.plugin-name.thearchiveplugin`. Note: The Archive requires plug-ins to follow this naming convention.

## Development

We recommend using The Archive's developer console for plug-in development. The console provides tools for debugging and configuring the manifest file options.

For more details, check out the official [developer documentation](https://zettelkasten.de/the-archive/help/plugins/).

## Releasing Your Plug-In

The Archive plug-ins are distributed as folders with the extension `.thearchiveplugin`. To share your plug-in, package it in a zip file containing the plug-in folder and all associated files.

### Release Steps

1. **Update the Version**: Increment the plug-in version in the manifest file and commit your changes.
2. **Zip the Plug-In Folder**: Compress the folder with the `.thearchiveplugin` extension.
3. **Publish Your Release**: Add the zip file to your repository or create a release on GitHub with the zip file attached.
