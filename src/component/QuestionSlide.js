import React from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MyButton from '../component/MyButton'

const styles = StyleSheet.create({
    wrapper: {
      padding: '24'
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#BB86FC',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#BB86FC',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#BB86FC',
    },
    text: {
      color: '#FFF',
      fontSize: 30,
      fontWeight: 'normal',
    },
    indexes: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'normal',
    }
})

export const QuestionSlide = (props) => {
    const { question, index, cardCount, toggleShowAnswer, swipeSlider, onCorrectAnswer } = props

    return (
        <View key={question.id} style={styles.slide1}>
            <Text style={styles.indexes}>
                {`Question ${index + 1} of ${cardCount}`}
            </Text>
            {question.showingAnswer
                ? (<Text style={styles.text}>{question.answer}</Text>)
                : (<Text style={styles.text}>{question.question}</Text>)
            }
            <MyButton
                text={question.showingAnswer ? 'Hide Answer' : 'Show Answer'}
                onPress={() => toggleShowAnswer(question)}
            />
            <MyButton
                disabled={!question.showingAnswer}
                text='Correct'
                onPress={() => onCorrectAnswer(index)}
            />
            <MyButton
                disabled={!question.showingAnswer}
                text='Incorrect'
                onPress={() => swipeSlider(index)}
            />
        </View>
    )
}
