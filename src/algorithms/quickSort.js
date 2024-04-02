function doQuickSort(array, start, end, animations){
    if (start < end) {
        let pivotIndex = partition(array, start, end, animations);
        doQuickSort(array, start, pivotIndex - 1, animations);
        doQuickSort(array, pivotIndex + 1, end, animations);
    }
}

function partition(array, start, end, animations) {
    let pivotValue = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
    animations.push([i, end]); // Compare pivotValue and array[i]
    animations.push([i, end]); // Revert their color
    if (array[i] < pivotValue) {
        // Swap elements at pivotIndex and i
        animations.push([i, array[pivotIndex], true]);
        animations.push([pivotIndex, array[i], true]);
        [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
        pivotIndex++;
    }
    }
    // Swap elements at pivotIndex and end
    animations.push([pivotIndex, array[end], true]);
    animations.push([end, array[pivotIndex], true]);
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    return pivotIndex;
}

export function getQuickSortAnimations(array) {
    const animations = [];
    doQuickSort(array, 0, array.length - 1, animations);
    return animations;
}