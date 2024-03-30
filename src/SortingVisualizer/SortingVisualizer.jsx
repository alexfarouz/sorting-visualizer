import React from "react";
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../SortingAlgorithms/mergeSort.js'
import Slider from '../slider.jsx';

const COLOR_1 = 'red';
const COLOR_2 = 'white';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
            animationSpeed: 1,
        };
        this.buttonRef = React.createRef();
        this.genButton = React.createRef();
        this.sliderRef = React.createRef();
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
            array.push(randInt(5,window.screen.height - 275));
        }
        this.setState({array});
        this.changeArrayBarColor('red');
    }

    mergeSort(){ // Call merge sort from SortingAlgorithms director
        this.disableButtons(); // disable buttons for use
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
                }, i * this.state.animationSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    if (i === animations.length - 1) {
                        this.changeArrayBarColor('#8A2BE2'); // Change color of bars once completed
                        // Re-enable the button in the last animation's callback
                        this.enableButtons();
                    }
                }, i * this.state.animationSpeed);
            }
        }
        
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    /*testAlgos(){ // Method for testing algorithms
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
    }*/

    enableButtons(){
        this.buttonRef.current.disabled = false;
        this.genButton.current.disabled = false;
    }

    disableButtons(){
        this.buttonRef.current.disabled = true;
        this.genButton.current.disabled = true;
    }

    changeArrayBarColor(color) {
        const bars = document.querySelectorAll('.array-bar');
        bars.forEach(bar => {
            bar.style.backgroundColor = color;
        });
    }

    setAnimationSpeed = (speed) => {
        this.setState({ animationSpeed: speed });
    };

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
                <button class="button" ref={this.buttonRef} onClick={() => this.resetArray()}>Generate New Array</button>
                <button class="button" ref={this.genButton} onClick={() => this.mergeSort()}>Merge Sort</button>
                <button class="button" onClick={() => this.quickSort()}>Quick Sort</button>
                <button class="button" onClick={() => this.heapSort()}>Heap Sort</button>
                <button class="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button class="button" onClick={() => this.testAlgos()}>Test Sorting</button>
                <Slider value={this.state.animationSpeed} onChange={this.setAnimationSpeed} />
           </div>
        );
    }
}

function randInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

/*function arrIsEqual(arr1, arr2){
    if(arr1.length !== arr2.length)return false;
    for(let i = 0; i < arr1.length; i++){
        // Return
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}*/