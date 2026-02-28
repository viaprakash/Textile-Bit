# Textile Bitmap Converter

## Overview
The Textile Bitmap Converter is a web application designed specifically for textile designers. It addresses the common challenge of converting images into high-quality bitmap formats, even when the original images are of low quality. This tool allows designers to upload images, select portions for conversion, and choose between black and white or color outputs.

## Features
- **Image Upload**: Users can easily upload images through a user-friendly interface.
- **Selection Tools**: Select specific portions of the image for conversion.
- **High-Quality Conversion**: Convert low-quality images into high-quality bitmap formats.
- **Color Options**: Choose between black and white or color bitmap conversions.
- **Download Options**: Download the converted images in various scales.
- **Responsive Design**: Aesthetic and intuitive UI tailored for textile design.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Image Processing**: Custom algorithms for bitmap conversion and color extraction
- **State Management**: Redux for managing application state

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/textile-bitmap-converter.git
   ```
2. Navigate to the client directory and install dependencies:
   ```
   cd textile-bitmap-converter/client
   npm install
   ```
3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```
4. Set up environment variables by copying `.env.example` to `.env` and configuring your settings.

## Running the Application
1. Start the server:
   ```
   cd server
   npm run dev
   ```
2. In a new terminal, start the client:
   ```
   cd client
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
- Special thanks to the open-source community for their invaluable resources and tools.