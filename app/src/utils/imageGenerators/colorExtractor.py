import png

from math import ceil


class ColorExtractor(object):

    @staticmethod
    def _compressColor(pixel, level=16):
        r, g, b = pixel
        r = min(ceil(r / level) * level, 255)
        g = min(ceil(g / level) * level, 255)
        b = min(ceil(b / level) * level, 255)
        return r, g, b

    @staticmethod
    ## converts a pixel expressed in RGB to an HSV expression
    #    see https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
    #    @param pixel triple of [0-255] RGB values
    def _rgbToHsv(pixel):
        r, g, b = pixel

        r /= 255
        g /= 255
        b /= 255

        MAX = max(r, g, b)
        MIN = min(r, g, b)

        if MAX == MIN:
            h = 0
        elif MAX == r:
            h = 60 * (((g - b) / (MAX - MIN)) + 0)
        elif MAX == g:
            h = 60 * (((b - r) / (MAX - MIN)) + 2)
        else:
            h = 60 * (((r - g) / (MAX - MIN)) + 4)
        if h < 0:
            h += 360

        if MAX == 0:
            s = 0
        else:
            s = (MAX - MIN) / MAX

        v = MAX
        return h, s, v

    @staticmethod
    ## converts a pixel expressed in RGB to an HSV expression
    # see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
    # @param pixel triple of ([0-360], [0-1], [0-1]) HSV values
    def _hsvToRgb(pixel):
        h, s, v = pixel

        chroma = v * s
        h /= 60
        x = chroma * (1 - abs((h % 2) - 1))

        if 0 <= h <= 1:
            r1, g1, b1 = chroma, x, 0
        elif 1 < h <= 2:
            r1, g1, b1 = x, chroma, 0
        elif 2 < h <= 3:
            r1, g1, b1 = 0, chroma, x
        elif 3 < h <= 4:
            r1, g1, b1 = 0, x, chroma
        elif 4 < h <= 5:
            r1, g1, b1 = x, 0, chroma
        elif 5 < h < 6:
            r1, g1, b1 = chroma, 0, x
        else:
            r1, g1, b1 = 0, 0, 0

        m = v - chroma

        r = int(round((r1 + m) * 255))
        g = int(round((g1 + m) * 255))
        b = int(round((b1 + m) * 255))

        return r, g, b

    @staticmethod
    ## Reads the image. This returns a tuple of the form
    # (height, width, raw_image_data, other_metadata_dict)
    # @param f a file-like object
    def _readImg(f):
        img = png.Reader(file=f).read()
        rawImg = img[2]
        step = 4 if img[3]['alpha'] else 3

        processedImg = []
        for row in rawImg:
            newRow = []
            for i in range(0, len(row), step):
                r, g, b = row[i], row[i + 1], row[i + 2]
                newRow.append((r, g, b))
            processedImg.append(newRow)
        return processedImg

    @staticmethod
    ## Applies a pixel-wise function to an entire image.
    # @param img an image represented as a list of rows with each row a list of pixels
    # @param fun the function to apply
    # @param args a tuple of arguments to pass on to the pixel-wise function
    def _convertImage(img, fun, args=()):
        newImg = []
        for row in img:
            newRow = []
            for px in row:
                newRow.append(fun(px, *args))
            newImg.append(newRow)
        return newImg

    @staticmethod
    ## Creates a histogram of an image. This is a dict of the form {pixel_value: number}
    # @param img an image represented as a list of rows with each row a list of pixels
    def _histogram(img):
        histogram = {}
        for row in img:
            for px in row:
                if px in histogram.keys():
                    histogram[px] += 1
                else:
                    histogram[px] = 1
        return histogram

    @staticmethod
    ## finds the dominant color in a histogram of HSV pixels
    # @param histogram a histogram as returned by _histogram()
    def _findDomColor(histogram):
        counts = [v for k, v in histogram.items()]
        totalPx = sum(counts)
        # eliminating colors that are less than 1% of the image
        minNumberCutoff = 0.01 * totalPx
        histogram = {k: v for k, v in histogram.items() if v >=
                     minNumberCutoff}
        counts = [v for k, v in histogram.items()]
        colors = list(histogram.keys())

        scores = {}
        for i in range(len(colors)):
            _, s, v = colors[i]
            score = s + v + (counts[i] / totalPx)
            # TODO : Value cutoff
            scores[score] = colors[i]

        domColor = scores[max(scores.keys())]
        return domColor

    @staticmethod
    ## Extracts and returns the dominant color from an image (RGB)
    # @param fname path of the target image
    def extractDominantColor(fname):
        with open(fname, 'rb') as f:
            img = ColorExtractor._readImg(f)
        img = ColorExtractor._convertImage(img, ColorExtractor._compressColor, (32,))
        img = ColorExtractor._convertImage(img, ColorExtractor._rgbToHsv)

        domColor = ColorExtractor._findDomColor(ColorExtractor._histogram(img))
        domColor = ColorExtractor._hsvToRgb(domColor)
        return domColor
