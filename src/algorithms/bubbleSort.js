// bubbleSort.js

export function getBubbleSortAnimations(array) {
    const animations = [];
    let len = array.length;
    let isSwapped = false;

    do {
        isSwapped = false;
        for (let i = 0; i < len - 1; i++) {
            // Push compare animation
            animations.push(["compare", i, i + 1]);
            if (array[i] > array[i + 1]) {
                // Push swap animation
                animations.push(["swap", i, i + 1]);
                let tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
                isSwapped = true;
            }
        }
    } while (isSwapped);

    return animations;
}