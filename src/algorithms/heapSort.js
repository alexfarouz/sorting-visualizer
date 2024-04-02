function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
        animations.push(["compare", i, left]); // Add this line to visualize the comparison
        if (array[left] > array[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        animations.push(["compare", i, right]); // Add this line to visualize the comparison
        if (array[right] > array[largest]) {
            largest = right;
        }
    }

    // If largest is not root
    if (largest !== i) {
        animations.push(["swap", i, largest]);
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest, animations);
    }
}

function heapSort(array) {
    const animations = [];
    const n = array.length;
  
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        animations.push(["swap", 0, i]);
        [array[0], array[i]] = [array[i], array[0]];
        // call max heapify on the reduced heap
        heapify(array, i, 0, animations);
    }
  
    return animations;
}

export function getHeapSortAnimations(array) {
    const auxiliaryArray = array.slice();
    return heapSort(auxiliaryArray);
}
