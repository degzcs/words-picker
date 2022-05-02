export const getMetaData = (fullText, entities) => {
  entities.map(({text, type},index)=>{
    fullText= fullText.replaceAll(text, '<index-'+index+'>')
  })

  return fullText.split(' ')
}

export const getMetaSentences = (sentences) => {
  var ms = []
  sentences.map(({sentence, entities}) => {
    //TODO update entities array with diffent color here
    // and read that color in EntityForm and SenteceForm
    ms = [...ms,
      {
        metaSentence: getMetaData(sentence.text, entities),
        sentence: sentence,
        entities: entities
      }
    ];
  })

  return ms;
}
