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
      const newEntities = entities.map(entity => (
          {...entity, color: pickColor(entity.type) } 
      )
  )
    ms = [...ms,
      {
        metaSentence: getMetaData(sentence.text, newEntities),
        sentence: sentence,
        entities: newEntities 
      }
    ];
  })

  return ms;
}

export const pickColor = (text) => {
    const colors = { 
        'ORG': 'bg-info',
        'GPE': 'bg-success',
        'DEFAULT': 'bg-danger'
    }
        
    if(colors[text.toString().toUpperCase()]){
        return colors[text.toString().toUpperCase()]
    }
    else {
        return colors['DEFAULT']
    }
}
