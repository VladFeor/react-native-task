import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Dropdown } from 'react-native-element-dropdown';
import * as math from 'mathjs';
import { JSX, SetStateAction, useEffect, useState } from 'react';
import Orientation from 'react-native-orientation';
import * as ScreenOrientation from "expo-screen-orientation";


const dataDistance = [
    { label: 'cm', value: 'cm' },
    { label: 'm', value: 'm' },
    { label: 'km', value: 'km' },
];
const dataWeight = [
    { label: 'g', value: 'g' },
    { label: 'kg', value: 'kg' },
    { label: 'ton', value: 'ton' },
];
const dataTemperature = [
    { label: 'C', value: 'C' },
    { label: 'F', value: 'F' },
    { label: 'K', value: 'K' },
];
const dataValue = [
    { label: 'Distance', value: 'd' },
    { label: 'Weight', value: 'w' },
    { label: 'Temperature.', value: 't' },
];

export default function TabOneScreen() {
    const [output, setOutput] = useState('0');
    const [orientation, setOrientation] = useState(1);
    const [mathOperation, setMathOperation] = useState('');
    const [pastValue, setPastValue] = useState('');
    const [value1, setValue1] = useState<any>('m');
    const [value2, setValue2] = useState<any>('m');
    const [selectValue, setSelectValue] = useState<any>('d');
    const [useDataToConvector, setUseDataToConvector] = useState(dataDistance)

    const [isConvector, setIsConvector] = useState(false)
    const [isFocus, setIsFocus] = useState(false);





    const handleNumberClick = (value: string) => {
        if (mathOperation !== '' && output === pastValue) {
            setOutput('0');
        }
        let updatedOutput;
        if (value === ',' && output == '0') {
            setOutput('0,')
            return
        }
        if (value === ',' && output.includes(',')) {
            updatedOutput = output;
        } else {
            const hasDot = output.includes('.');

            if (output.trim() === '0' || output.trim() === pastValue) {
                updatedOutput = value;
            } else if (!hasDot || (value !== ',' && !hasDot)) {
                updatedOutput = output + value;
            } else {
                updatedOutput = output;
            }
        }

        setOutput(updatedOutput);
    };

    const handleOperationClick = (newValue: string) => {
        if (isConvector) return
        setMathOperation(newValue);
        if (mathOperation !== '' && pastValue !== '' && pastValue !== output) {
            handleResultClick();
        } else {
            setPastValue(output);
        }
        setMathOperation(newValue);

    };
    const handlePercentageClick = () => {
        if (isConvector) return

        if (output.slice(-1) === ',' || output === '0') return;

        const floatValue = parseFloat(output.replace(/,/g, '.'));
        const result = (floatValue * 0.1).toFixed(10).replace(/\.?0*$/, '').replace('.', ',');

        setOutput(result);
    };

    const distanceCalculate = () => {
        let result: number = 0;

        if (value1 === 'cm' && value2 === 'm') result = parseFloat(output) * 0.01;
        if (value1 === 'cm' && value2 === 'km') result = parseFloat(output) * 0.000001;
        if (value1 === 'm' && value2 === 'cm') result = parseFloat(output) * 100;
        if (value1 === 'm' && value2 === 'km') result = parseFloat(output) * 0.001;
        if (value1 === 'km' && value2 === 'cm') result = parseFloat(output) * 100000;
        if (value1 === 'km' && value2 === 'm') result = parseFloat(output) * 1000;
        if (value1 == value2) return


        setValue1(value2);
        return setOutput(result.toString());
    };
    const temperatureConvert = () => {
        let result: number = 0;
        
        if (value1 == 'C' && value2 == 'F') {
            result = (parseFloat(output) * 9/5) + 32; 
        }
        if (value1 == 'C' && value2 == 'K') {
            result = parseFloat(output) + 273.15; 
        }
        if (value1 == 'F' && value2 == 'C') {
            result = (parseFloat(output) - 32) * 5/9; 
        }
        if (value1 == 'F' && value2 == 'K') {
            result = (parseFloat(output) - 32) * 5/9 + 273.15;
        }
        if (value1 == 'K' && value2 == 'C') {
            result = parseFloat(output) - 273.15; 
        }
        if (value1 == 'K' && value2 == 'F') {
            result = (parseFloat(output) - 273.15) * 9/5 + 32; 
        }
        if (value1 == value2) return

        
        setValue1(value2);
        return setOutput(result.toString());
    };
    const weightCalculate = () => {
        let result: number = 0;

        if (value1 === 'g' && value2 === 'kg') result = parseFloat(output) * 0.001;
        if (value1 === 'g' && value2 === 'ton') result = parseFloat(output) * 0.000001;
        if (value1 === 'kg' && value2 === 'g') result = parseFloat(output) * 1000;
        if (value1 === 'kg' && value2 === 'ton') result = parseFloat(output) * 0.001;
        if (value1 === 'ton' && value2 === 'g') result = parseFloat(output) * 1000000;
        if (value1 === 'ton' && value2 === 'kg') result = parseFloat(output) * 1000;
        if (value1 == value2) return


        setValue1(value2);
        return setOutput(result.toString());
    };
    const handleResultClick = async () => {
        if (isConvector) {
            if (selectValue == 'd') return distanceCalculate()
            if (selectValue == 'w') return weightCalculate()
            if (selectValue == 't') return temperatureConvert()

        }
        if (mathOperation === '' || pastValue === '') return;

        let result;

        try {

            const expression = (pastValue + (mathOperation == '÷' ? '/' : mathOperation) + output).replace(/,/g, '.');
            result = math.evaluate(expression);

            result = parseFloat(result.toFixed(10)).toString().replace('.', ',');

        } catch (error) {
            result = 'Error';
        }

        setMathOperation('');
        setPastValue(result);
        setOutput(result);
    };

    const handleClearClick = () => {
        setOutput('0');
        setMathOperation('')
        setPastValue('')
    };

    const handlePlusMinusClick = () => {
        if (isConvector) return

        if (parseFloat(output) == 0) return;
        setOutput((parseFloat(output.replace(/,/g, '.')) * -1.0).toString().replace('.', ','));
    };

    const renderLabel = (value: string) => {
        if (value || isFocus) {
            return (
                <Text style={styles.label}>
                    {value}
                </Text>
            );
        }
        return null;
    };

    useEffect(() => {
        lockOrientation();
        const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);
    useEffect(() => {
        if (selectValue == 'd') {
            setUseDataToConvector(dataDistance)
            setValue1(dataDistance[0].value)
            setValue2(dataDistance[0].value)
        }
        if (selectValue == 'w'){ 
            setUseDataToConvector(dataWeight)
            setValue1(dataWeight[0].value)
            setValue2(dataWeight[0].value)
        }
        if (selectValue == 't'){ 
            setUseDataToConvector(dataTemperature)
            setValue1(dataTemperature[0].value)
            setValue2(dataTemperature[0].value)
        }
    }, [selectValue]);

    const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        const initialOrientation = await ScreenOrientation.getOrientationAsync();
        setOrientation(initialOrientation);
        setIsConvector(false)
    };

    const handleOrientationChange: ScreenOrientation.OrientationChangeListener = ({ orientationInfo }) => {
        const { orientation } = orientationInfo;
        setOrientation(orientation);
        setIsConvector(false)

    };
    const changeConvectorHander = () => {
        setIsConvector(!isConvector)
    }
    const itemCalculate = (orientation === 1 ? styles.item_calculate : styles.item_calculate_adapt)
    const calculateRow = (orientation === 1 ? styles.calculate__row : styles.calculate__row_adapt)
    const calculatorContent = (orientation === 1 ? styles.calculator__content : styles.calculate__row_adapt)
    const outputStyle = (orientation === 1 ? styles.output : styles.output_adapt)

    return (
        <View style={styles.calculator}>
            <View style={calculatorContent}>
                {orientation != 1
                    &&
                    <>
                        <TouchableOpacity style={styles.convector}
                            onPress={changeConvectorHander}
                        ><Text>{isConvector ? 'Off Convector' : 'On Convector'}</Text></TouchableOpacity>

                        <View style={styles.selector} >
                            {renderLabel(value1)}
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={useDataToConvector}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                value={value1}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue1(item.value);
                                    setIsFocus(false);
                                }}
                            />
                            <View>
                                {renderLabel(value2)}
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={useDataToConvector}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={value2}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setValue2(item.value);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>



                        </View>
                        <View style={styles.selector__value} >
                            {renderLabel(selectValue)}
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={dataValue}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                value={selectValue}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setSelectValue(item.value);
                                    setIsFocus(false);
                                }}
                            />



                        </View>

                    </>

                }

                <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.scrollView} >
                    <View style={orientation !== 1 && styles.outputContainer}>
                        <Text style={outputStyle} >{output}{isConvector && value1}</Text>
                    </View>
                </ScrollView>
                <View style={styles.calculate__content}>
                    <View style={calculateRow}>
                        <TouchableOpacity style={[itemCalculate, styles.function]} onPress={handleClearClick}><Text style={styles.itemText}>{output == '0' ? 'AC' : 'C'}</Text></TouchableOpacity>
                        <TouchableOpacity style={[itemCalculate, styles.function]} onPress={handlePlusMinusClick}><Text style={styles.itemText}>±</Text></TouchableOpacity>
                        <TouchableOpacity style={[itemCalculate, styles.function]} onPress={handlePercentageClick}><Text style={styles.itemText}>%</Text></TouchableOpacity>
                        <TouchableOpacity style={[itemCalculate, styles.math_function]} onPress={() => handleOperationClick('÷')}><Text style={styles.itemText}>÷</Text></TouchableOpacity>
                    </View>
                    <View style={calculateRow}>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('7')} ><Text style={styles.itemText} >7</Text></TouchableOpacity>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('8')} ><Text style={styles.itemText} >8</Text></TouchableOpacity>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('9')} ><Text style={styles.itemText} >9</Text></TouchableOpacity>
                        <TouchableOpacity style={[itemCalculate, styles.math_function]} onPress={() => handleOperationClick('*')}><Text style={styles.itemText}>×</Text></TouchableOpacity>
                    </View>
                    <View style={calculateRow}>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('4')} ><Text style={styles.itemText}>4</Text></TouchableOpacity>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('5')} ><Text style={styles.itemText}>5</Text></TouchableOpacity>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('6')} ><Text style={styles.itemText}>6</Text></TouchableOpacity>
                        <TouchableOpacity style={[itemCalculate, styles.math_function]} onPress={() => handleOperationClick('-')}><Text style={styles.itemText}>−</Text></TouchableOpacity>
                    </View>
                    <View style={calculateRow}>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('1')} ><Text style={styles.itemText}>1</Text></TouchableOpacity>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('2')} ><Text style={styles.itemText}>2</Text></TouchableOpacity>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick('3')} ><Text style={styles.itemText}>3</Text></TouchableOpacity>
                        <TouchableOpacity style={[itemCalculate, styles.math_function]} onPress={() => handleOperationClick('+')}><Text style={styles.itemText}>+</Text></TouchableOpacity>
                    </View>
                    <View style={calculateRow}>
                        <TouchableOpacity style={[itemCalculate, styles.zero]} onPress={() => handleNumberClick('0')}><Text style={styles.itemText}>0</Text></TouchableOpacity>
                        <TouchableOpacity style={itemCalculate} onPress={() => handleNumberClick(',')}><Text style={styles.itemText}>,</Text></TouchableOpacity>
                        <TouchableOpacity style={[itemCalculate, styles.math_function]} onPress={handleResultClick}><Text style={styles.itemText}>=</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    calculator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selector: {
        display: 'flex',
        position: "absolute",
        top: 0,
        left: 50,
        zIndex: 100,
        width: 100
    },
    selector__value: {
        display: 'flex',
        position: "absolute",
        top: 50,
        left: 300,
        zIndex: 100,
        width: 100
    },
    convector: {
        position: 'absolute',
        top: 10,
        left: 300,
        padding: 10,
        zIndex: 150,
        backgroundColor: 'red'
    },
    calculator__content: {
        color: '#ffffff',
        width: '100%',
        height: 875,
    },
    calculator__content__adapt: {
        color: '#ffffff',
        width: '100%',
        height: 875,
        paddingHorizontal: 40
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    time: {
        marginLeft: 35,
        color: '#ffffff',
    },
    display__elements: {
        marginRight: 10,
        flexDirection: 'row',
    },
    element: {
        marginRight: 5,
    },
    scrollView: {
        // flexDirection: 'row-reverse', 

        maxHeight: 250,
        width: '100%',
    },
    content: {
        height: 50
    },
    output: {
        textAlign: 'right',
        marginTop: 150,
        fontSize: 80,
        paddingRight: 20,
        color: '#ffffff',
    },
    output_adapt: {
        marginTop: 100,
        textAlign: 'right',
        fontSize: 80,
        paddingRight: 20,
        color: '#ffffff',
    },
    outputContainer: {
        paddingLeft: 30
    },
    calculate__row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 17,
    },
    calculate__row_adapt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        paddingVertical: 9,
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        backgroundColor: 'red'
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,

    },
    inputSearchStyle: {
        height: 20,
        fontSize: 16,
    },
    calculate__content: {
        marginTop: 30,
        padding: 0,
    },
    item_calculate: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 36,
        // cursor: 'pointer',
    },
    item_calculate_adapt: {
        width: 80,
        height: 50,
        borderRadius: 22,
        marginRight: 10,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 36,
        // cursor: 'pointer',
    },
    zero: {
        width: 155,
        borderRadius: 62,
        alignItems: 'center',
    },
    function: {
        backgroundColor: '#C4C4C4',
        color: '#333333',
    },
    math_function: {
        backgroundColor: '#FF9500',
    },
    itemText: {
        color: '#ffffff',
        fontSize: 38,
    },
});
