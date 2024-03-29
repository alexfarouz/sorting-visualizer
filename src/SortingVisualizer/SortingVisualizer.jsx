import React from "react";
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js'

const COLOR_1 = 'red';
const COLOR_2 = 'white';
const ANIMATION_SPEED_MS = 1;

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
        };
    }

    
    componentDidMount(){
        this.resetArray();
    }

    // Base dimensions for bars based off of user screen
    resetArray(){
        const array = [];
        // Generate number of bars based on screen width
        for(let i = 0; i < window.screen.width/4.5; i++){
            // Generate height of bars based off screen height
            array.push(randInt(5,window.screen.height - 250));
        }
        this.setState({array});
    }

    mergeSort(){ // Call merge sort from SortingAlgorithms directory
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? COLOR_2 : COLOR_1;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testAlgos(){ // Method for testing algorithms
        for(let i = 0; i < 100; i++){
            const array = [];
            const length = randInt(1,1000);
            for(let i = 0; i < length; i++){
                array.push(randInt(-1000,1000));
            }
            const javaScriptArr = array.slice().sort((a,b) => a-b);
            const sortedArr = getMergeSortAnimations(array.slice());
            console.log(arrIsEqual(javaScriptArr, sortedArr));
        }
    }

    render() {
        const {array} = this.state;

        return (
           <div className="array-container">
                {array.map((value, i) => (
                    <div 
                        className="array-bar" 
                        key={i}
                        style={{
                            backgroundColor: COLOR_1,
                            height: `${value}px`
                        }}></div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.testAlgos()}>Test Sorting</button>
           </div>
        );
    }
}

function randInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function arrIsEqual(arr1, arr2){
    if(arr1.length !== arr2.length)return false;
    for(let i = 0; i < arr1.length; i++){
        // Return
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}

