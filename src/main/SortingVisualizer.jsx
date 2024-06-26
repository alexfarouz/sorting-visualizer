import React from "react";
import '../components/SortingVisualizer.css'
import { getMergeSortAnimations } from '../algorithms/mergeSort.js'
import { getQuickSortAnimations } from "../algorithms/quickSort.js";
import { getHeapSortAnimations } from "../algorithms/heapSort.js";
import { getBubbleSortAnimations } from "../algorithms/bubbleSort.js";
import Slider from '../components/slider.jsx';

const COLOR_1 = 'red';
const COLOR_2 = 'white';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            array: [],
        };
        this.animationSpeed = 1;
        this.numBars = Math.floor(window.screen.width/8);
        this.mergeButton = React.createRef();
        this.genButton = React.createRef();
        this.quickButton = React.createRef();
        this.heapButton = React.createRef();
        this.bubbleButton = React.createRef();
    }
    
    componentDidMount(){
        this.resetArray();
    }

    // Base dimensions for bars based off of user screen
    resetArray(){
        const array = [];
        // Generate number of bars based on screen width
        for(let i = 0; i < this.numBars; i++){
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
                }, i * this.animationSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.animationSpeed);
            }
        }
        setTimeout(() => {
            this.changeArrayBarColor('#8A2BE2'); // Change color of bars once completed
            // Re-enable the button in the last animation's callback
            this.enableButtons();
        }, animations.length * this.animationSpeed);
    }
    
    quickSort(){
        this.disableButtons();
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = !animations[i][2];
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 2 === 0 ? COLOR_2 : COLOR_1;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * this.animationSpeed);
            } else {
                setTimeout(() => {
                const [barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].style;
                barStyle.height = `${newHeight}px`;
                }, i * this.animationSpeed);
            }
        }
        setTimeout(() => {
            this.changeArrayBarColor('#8A2BE2'); // Change color of bars once completed
            this.enableButtons();
        }, animations.length * this.animationSpeed);
    }
    
    heapSort() {
        this.disableButtons();
        const animations = getHeapSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        const animationDuration = this.animationSpeed;
    
        animations.forEach(([type, indexOne, indexTwo], i) => {
            setTimeout(() => {
                // Handle the comparison/swap animations
                if (type === "compare") {
                    // Temporarily highlight bars being compared
                    arrayBars[indexOne].style.backgroundColor = COLOR_2;
                    if (indexTwo !== undefined) arrayBars[indexTwo].style.backgroundColor = COLOR_2;
                } else if (type === "swap") {
                    // Swap the percentage heights of bars
                    let tempHeight = arrayBars[indexOne].style.height; // These are already in '%'
                    arrayBars[indexOne].style.height = arrayBars[indexTwo].style.height;
                    arrayBars[indexTwo].style.height = tempHeight;
                }
    
                // Schedule to revert colors back to original after a brief moment
                setTimeout(() => {
                    arrayBars[indexOne].style.backgroundColor = COLOR_1;
                    if (indexTwo !== undefined) arrayBars[indexTwo].style.backgroundColor = COLOR_1;
                }, animationDuration / 3); // Adjust as needed for visual clarity
            }, i * animationDuration);
        });
    
        // After all animations, ensure bars are updated and buttons re-enabled
        setTimeout(() => {
            // Correctly capturing the final sorted state is essential here
            const sortedArray = Array.from(arrayBars).map(bar => parseFloat(bar.style.height) * 8.5); // Convert back to your array value format
            this.setState({ array: sortedArray });
            this.changeArrayBarColor('#8A2BE2'); // Final color change to indicate completion
            this.enableButtons();
        }, animations.length * animationDuration + 10);
    }
    
    bubbleSort() {
        this.disableButtons();
        const animations = getBubbleSortAnimations(this.state.array);
        // Adjust the animation speed here to make the animation faster
        let animationSpeed = this.animationSpeed / 2; // Example: Halve the original speed for a faster animation
    
        let currentStep = 0;
        const executeAnimationStep = () => {
            if (currentStep >= animations.length) {
                setTimeout(() => {
                    this.changeArrayBarColor('#8A2BE2'); // Change all bars to indicate completion
                    this.enableButtons();
                }, animationSpeed); // Ensure this runs after the last step's color reversion
                return;
            }
    
            const [type, indexOne, indexTwo] = animations[currentStep];
            const arrayBars = document.getElementsByClassName('array-bar');
            const barOneStyle = arrayBars[indexOne].style;
            const barTwoStyle = arrayBars[indexTwo].style;
    
            if (type === "compare") {
                barOneStyle.backgroundColor = COLOR_2; // Highlight comparing bars in white
                barTwoStyle.backgroundColor = COLOR_2;
                // Schedule to revert color back to original after a brief moment
                setTimeout(() => {
                    barOneStyle.backgroundColor = COLOR_1;
                    barTwoStyle.backgroundColor = COLOR_1;
                }, animationSpeed / 3); // Make reversion quicker
            } else if (type === "swap") {
                let tempHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tempHeight;
            }
    
            currentStep++;
            setTimeout(executeAnimationStep, animationSpeed); // Schedule the next step
        };
    
        executeAnimationStep(); // Start the animation process
    }    

    enableButtons(){ // Enable buttons for use
        this.mergeButton.current.disabled = false;
        this.genButton.current.disabled = false;
        this.quickButton.current.disabled = false;
        this.heapButton.current.disabled = false;
        this.bubbleButton.current.disabled = false;
    }

    disableButtons(){ // Disable buttons
        this.mergeButton.current.disabled = true;
        this.genButton.current.disabled = true;
        this.quickButton.current.disabled = true;
        this.heapButton.current.disabled = true;
        this.bubbleButton.current.disabled = true;
    }

    changeArrayBarColor(color) { // Change color of array bars
        const bars = document.querySelectorAll('.array-bar');
        bars.forEach(bar => {
            bar.style.backgroundColor = color;
        });
    }

    setAnimationSpeed = (speed) => {
        this.animationSpeed = speed;
    };

    setNumBars = (bars) => {
        this.numBars = bars;
    }

    render() {
        const {array} = this.state;
        return (
           <div className="array-container">
                <div className="array-bar-container">
                    {array.map((value, i) => (
                        <div 
                            className="array-bar" 
                            key={i}
                            style={{
                                backgroundColor: COLOR_1,
                                height: `${value/8.5}%`,
                                width: `${(426/this.numBars)*2}px`,   
                        }}/>
                    ))}
                </div>
                <div>
                    <button className="button" ref={this.mergeButton} onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="button" ref={this.genButton} onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="button" ref={this.quickButton} onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="button" ref={this.heapButton} onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="button" ref={this.bubbleButton} onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
                    
                <div class="slider-container">
                    <Slider label={"Speed: "} value={this.animationSpeed} onChange={this.setAnimationSpeed} rangeMin={1} rangeMax={99} units={"ms"}/>
                    <Slider label={"Number of Bars: "} value={this.numBars} onChange={this.setNumBars} rangeMin={10} rangeMax={window.screen.width/8} units={""}/>
                </div>
           </div>
        );
    }
}

function randInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}