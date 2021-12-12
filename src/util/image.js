function gaussBlur(imgData) {
    const pixes = imgData.data;
    const width = imgData.width;
    const height = imgData.height;
    let gaussMatrix = [],
        gaussSum = 0,
        x, y,
        r, g, b, a,
        i, j, k, len;

    const radius = 10;
    const sigma = 5;

    a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
    b = -1 / (2 * sigma * sigma);
    //生成高斯矩阵
    for (i = 0, x = -radius; x <= radius; x++, i++) {
        g = a * Math.exp(b * x * x);
        gaussMatrix[i] = g;
        gaussSum += g;

    }
    //归一化, 保证高斯矩阵的值在[0,1]之间
    for (i = 0, len = gaussMatrix.length; i < len; i++) {
        gaussMatrix[i] /= gaussSum;
    }
    //x 方向一维高斯运算
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = x + j;
                if (k >= 0 && k < width) {//确保 k 没超出 x 的范围
                    //r,g,b,a 四个一组
                    i = (y * width + k) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    // a += pixes[i + 3] * gaussMatrix[j];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
            // console.log(gaussSum)
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
            // pixes[i + 3] = a ;
        }
    }
    //y 方向一维高斯运算
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
                k = y + j;
                if (k >= 0 && k < height) {//确保 k 没超出 y 的范围
                    i = (k * width + x) * 4;
                    r += pixes[i] * gaussMatrix[j + radius];
                    g += pixes[i + 1] * gaussMatrix[j + radius];
                    b += pixes[i + 2] * gaussMatrix[j + radius];
                    // a += pixes[i + 3] * gaussMatrix[j];
                    gaussSum += gaussMatrix[j + radius];
                }
            }
            i = (y * width + x) * 4;
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
        }
    }
    //end
    return imgData;
}

function getStyle(ele, attr) {
    return window.getComputedStyle(ele, null)[attr];
}

export function createImage(src, width, height) {
    return new Promise((resolve, reject) => {
        const image = new Image(src);
        image.src = src;
        image.width = width || parseFloat(getStyle(document.body, "width"));
        image.height = height || parseFloat(getStyle(document.body, "height"));
        image.onload = function () {
            resolve(image);
        }
        image.onerror = function (err) {
            height(err)
        }
    })
}

export function filterImage(img) {
    const w = img.width,
        h = img.height,
        canvasW = 60,
        canvasH = 60;

    const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = canvasW;
    canvas.height = canvasH;

    ctx.drawImage(img, 0, 0, w, h, 0, 0, canvasW, canvasH);

    let pixel = ctx.getImageData(0, 0, canvasH, canvasH);

    pixel = gaussBlur(pixel);

    ctx.putImageData(pixel, 0, 0);

    return canvas.toDataURL();
}