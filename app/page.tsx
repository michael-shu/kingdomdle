import React from 'react';
import kingdom from '../public/kingdom.json';
import * as fs from 'fs';
import Game from './components/Game';
import Image from 'next/image';

const numbers = [
  381, 248, 1, 279, 370, 7, 300, 292, 210, 193, 417, 342, 412, 289, 266, 344, 81,
  341, 167, 231, 219, 378, 87, 28, 403, 334, 415, 93, 328, 77, 404, 286, 346, 49,
  228, 361, 55, 382, 357, 74, 249, 68, 312, 71, 335, 85, 327, 120, 153, 209, 57,
  354, 152, 6, 110, 295, 172, 406, 161, 63, 293, 69, 17, 313, 196, 366, 200, 4,
  365, 188, 359, 114, 338, 21, 131, 32, 34, 156, 418, 107, 337, 389, 23, 208, 169,
  106, 51, 29, 336, 89, 62, 398, 217, 291, 141, 253, 97, 31, 287, 269, 204, 256,
  171, 173, 142, 399, 2, 379, 216, 66, 41, 123, 40, 283, 160, 140, 185, 144, 343,
  222, 257, 390, 178, 50, 294, 229, 139, 237, 355, 322, 316, 64, 76, 25, 91, 352,
  67, 90, 72, 13, 288, 181, 148, 373, 239, 12, 83, 75, 369, 360, 192, 143, 413, 16,
  296, 284, 52, 88, 116, 95, 146, 409, 136, 267, 368, 137, 5, 408, 227, 377, 395,
  273, 234, 384, 402, 0, 138, 410, 314, 151, 104, 358, 61, 347, 147, 264, 265, 135,
  232, 307, 102, 199, 202, 301, 150, 207, 201, 205, 374, 281, 180, 194, 36, 255,
  98, 315, 221, 251, 119, 340, 44, 394, 43, 396, 101, 214, 117, 218, 213, 58, 111,
  127, 304, 159, 308, 238, 30, 46, 391, 419, 184, 115, 132, 174, 320, 191, 268,
  252, 411, 362, 82, 351, 350, 128, 103, 333, 60, 18, 134, 92, 276, 175, 326, 168,
  303, 367, 416, 15, 78, 329, 272, 230, 306, 392, 186, 388, 37, 22, 27, 182, 285,
  19, 309, 246, 203, 33, 215, 197, 162, 371, 79, 3, 310, 383, 245, 39, 177, 195,
  9, 11, 198, 99, 247, 26, 206, 261, 393, 48, 20, 223, 330, 271, 126, 250, 240, 56,
  235, 397, 349, 270, 386, 244, 54, 179, 297, 225, 356, 149, 236, 323, 242, 226,
  380, 212, 414, 45, 105, 73, 10, 47, 14, 125, 170, 318, 311, 385, 24, 109, 241,
  38, 157, 8, 275, 130, 324, 290, 331, 100, 339, 298, 145, 400, 124, 113, 302, 96,
  263, 190, 259, 376, 154, 325, 176, 35, 189, 375, 121, 387, 299, 332, 317, 108,
  118, 262, 254, 211, 305, 53, 405, 129, 84, 70, 133, 348, 86, 187, 277, 122, 80,
  282, 233, 42, 353, 220, 319, 165, 274, 258, 280, 401, 59, 94, 321, 407, 158, 224,
  364, 163, 155, 243, 260, 183, 363, 345, 278, 166, 112, 164, 65, 372
];

const getIndexOfTheDay = (entries: number[]) => {
  const start = new Date('2024-12-01'); // Epoch start date
  const today = new Date();
  const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)); // Days since epoch
  const index = diff % entries.length; // Wrap around if needed
  return entries[index];
};

const charOfTheDay = () => {
  const indexOfTheDay = getIndexOfTheDay(numbers);
  const char = kingdom.data[indexOfTheDay];
  return char;
}

const blurred_images = () => {
  const char = charOfTheDay();
  const char_url = char.url.match(/wiki\/(.+)/);
  if (!char_url) {
    console.error("error reading from files");
    return;
  }


  const char_name = decodeURIComponent(char_url[1]);
  const images = fs.readdirSync('./public/blurred_images/' + char_name);

  const sortedImages = images.sort((a, b) => {
    // If one of the files is 'Ma_Kou.png', place it at the end
    if (a === 'Ma_Kou.png') return 1;
    if (b === 'Ma_Kou.png') return -1;

    // Extract numbers for `blur` files
    const numA = parseInt(a.match(/_blur_(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(b.match(/_blur_(\d+)/)?.[1] || '0', 10);

    // Sort by the numbers in descending order
    return numB - numA;
  });

  return sortedImages;

}



const page = () => {
  const images = blurred_images();

  const char = charOfTheDay();
  const char_url = char.url.match(/wiki\/(.+)/);
  if (!char_url) {
    console.error("error reading from files");
    return;
  }

  const names = kingdom.data.map((character) => {
    return character.name;
  })
  //console.log(names);


  return (
    <div className="flex-row justify-items-center justify-center">
      <div className="flex items-center m-10">
        <Image
          className="inline"
          alt="banner"
          src="/kingdom-solo.png"
          width={500}
          height={150}
        />
        <span className="text-3xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-amber-400 drop-shadow-lg">
          le
        </span>
      </div>
      {images &&
        <Game images={images} url={char.url} name={char_url[1]} names={names} />
      }
    </div>
  );
}

export default page;