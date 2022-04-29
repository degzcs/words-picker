export const getMetaData = (fullText, entities) => {
  entities.map(({text, type},index)=>{
    fullText= fullText.replaceAll(text, '<index-'+index+'>')
  })

  return fullText.split(' ')
}

export const getMetaSentenses = (sentenses) => {
  var ms = []
  sentenses.map(({sentense, entities}) => {
    ms = [...ms,
      {
        metaSentense: getMetaData(sentense.text, entities),
        sentense: sentense,
        entities: entities
      }
    ];
  })

  return ms;
}
