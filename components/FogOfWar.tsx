import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const numColumns = 10; // количество столбцов
const numRows = 20; // количество строк
const cellSize = width / numColumns; // размер ячейки будет зависеть от ширины экрана
const initialFog = Array(numRows).fill(Array(numColumns).fill(true));

export default () => {
    const [unitPosition, setUnitPosition] = useState({ x: 5, y: 11 });
    const [fog, setFog] = useState(initialFog);

    const moveUnit = (x, y) => {
        const newFog = fog.map((row, rowIndex) =>
            row.map((cell, cellIndex) => {
                const distance = Math.abs(rowIndex - y) + Math.abs(cellIndex - x);
                return distance <= 1 ? false : cell;
            })
        );
        setFog(newFog);
        setUnitPosition({ x, y });
    };

    const moveUp = () => {
        if (unitPosition.y > 0) moveUnit(unitPosition.x, unitPosition.y - 1);
    };

    const moveDown = () => {
        if (unitPosition.y < 4) moveUnit(unitPosition.x, unitPosition.y + 1);
    };

    const moveLeft = () => {
        if (unitPosition.x > 0) moveUnit(unitPosition.x - 1, unitPosition.y);
    };

    const moveRight = () => {
        if (unitPosition.x < 4) moveUnit(unitPosition.x + 1, unitPosition.y);
    };

    /**
     * 
     * 
     *                              unitPosition.x === cellIndex &&
                                    unitPosition.y === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || (unitPosition.x - 1) === cellIndex &&
                                    unitPosition.y === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || (unitPosition.x - 1) === cellIndex &&
                                    (unitPosition.y - 1) === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || unitPosition.x === cellIndex &&
                                    (unitPosition.y - 1) === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || (unitPosition.x + 1) === cellIndex &&
                                    (unitPosition.y - 1) === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || (unitPosition.x + 1) === cellIndex &&
                                    unitPosition.y === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || (unitPosition.x + 1) === cellIndex &&
                                    (unitPosition.y + 1) === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || unitPosition.x === cellIndex &&
                                    (unitPosition.y + 1) === rowIndex && (
                                        <View style={styles.unit} />
                                    ) || (unitPosition.x - 1) === cellIndex &&
                                    (unitPosition.y + 1) === rowIndex && (
                                        <View style={styles.unit} />
                                    )
     * 
     * 
     */

    const findCellStyle = (cell, cellIndex, rowIndex) => {
        if (
            unitPosition.x === cellIndex &&
            unitPosition.y === rowIndex ||

            (unitPosition.x - 1) === cellIndex &&
            unitPosition.y === rowIndex ||

            (unitPosition.x - 1) === cellIndex &&
            (unitPosition.y - 1) === rowIndex ||

            unitPosition.x === cellIndex &&
            (unitPosition.y - 1) === rowIndex ||

            (unitPosition.x + 1) === cellIndex &&
            (unitPosition.y - 1) === rowIndex ||

            (unitPosition.x + 1) === cellIndex &&
            unitPosition.y === rowIndex ||

            (unitPosition.x + 1) === cellIndex &&
            (unitPosition.y + 1) === rowIndex ||

            unitPosition.x === cellIndex &&
            (unitPosition.y + 1) === rowIndex ||

            (unitPosition.x - 1) === cellIndex &&
            (unitPosition.y + 1) === rowIndex ||

            (unitPosition.x + 2) === cellIndex &&
            unitPosition.y === rowIndex ||

            unitPosition.x === cellIndex &&
            (unitPosition.y + 2) === rowIndex ||

            (unitPosition.x - 1) === cellIndex &&
            (unitPosition.y + 2) === rowIndex
        ) {
            return styles.unit;
        } else {
            return styles.cell;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.map}>
                {fog.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => (
                            <View key={cellIndex} style={styles.cellContainer}>
                                {/* <View style={styles.cell} /> */}
                                {/* {cell && <View style={styles.fog} />} */}
                                {
                                    <View style={findCellStyle(cell, cellIndex, rowIndex)} />
                                    // unitPosition.x === cellIndex &&
                                    // unitPosition.y === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || (unitPosition.x - 1) === cellIndex &&
                                    // unitPosition.y === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || (unitPosition.x - 1) === cellIndex &&
                                    // (unitPosition.y - 1) === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || unitPosition.x === cellIndex &&
                                    // (unitPosition.y - 1) === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || (unitPosition.x + 1) === cellIndex &&
                                    // (unitPosition.y - 1) === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || (unitPosition.x + 1) === cellIndex &&
                                    // unitPosition.y === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || (unitPosition.x + 1) === cellIndex &&
                                    // (unitPosition.y + 1) === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || unitPosition.x === cellIndex &&
                                    // (unitPosition.y + 1) === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // ) || (unitPosition.x - 1) === cellIndex &&
                                    // (unitPosition.y + 1) === rowIndex && (
                                    //     <View style={styles.unit} />
                                    // )
                                }
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            {/* <View style={styles.controls}>
                <Button title="Up" onPress={moveUp} />
                <View style={styles.row}>
                    <Button title="Left" onPress={moveLeft} />
                    <Button title="Right" onPress={moveRight} />
                </View>
                <Button title="Down" onPress={moveDown} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 50,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 4,
    },
    map: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    cellContainer: {
        position: 'relative',
        width: cellSize,
        height: cellSize,
    },
    cell: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: '#999',
        backgroundColor: '#333',
        opacity: 0.7
    },
    fog: {
        // ...StyleSheet.absoluteFillObject,
    },
    unit: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'transparent',
        opacity: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 20,
    },
});