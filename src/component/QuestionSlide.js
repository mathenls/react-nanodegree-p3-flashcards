import React from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
  } from 'react-native';

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
    const { question, index } = props
    return (
        <View key={question.id} style={styles.slide1}>
            <Text style={styles.indexes}>
                {`Question ${index + 1} of ${questions.length}`}
            </Text>
            {question.showingAnswer 
                ? (<Text style={styles.text}>{question.answer}</Text>) 
                : (<Text style={styles.text}>{question.question}</Text>)
            }
            <MyButton
                title={question.showingAnswer ? 'Hide Answer' : 'Show Answer'}
                onPress={() => {
                    this.setState({
                    questions: questions.map((q) => {
                            if (q.id === question.id) {
                                q.showingAnswer = !q.showingAnswer
                            }
                            return q
                        })
                    })
                }}
            />
            <MyButton
                disabled={!question.showingAnswer}
                title='Correct'
                onPress={this.correctAnswer}
            />
            <MyButton
                disabled={!question.showingAnswer}
                title='Incorrect'
                onPress={() => {
                    this._swiper.scrollBy(1)
                }}
            />
        </View>
    )
}
