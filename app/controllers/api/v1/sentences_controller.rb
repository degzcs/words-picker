class Api::V1::SentencesController < ApplicationController
  def index
    sentences = ::Sentences.all
    if sentences
      render json: sentences
    else
      render json: sentences.errors
    end
  end

  def create
    sentence = Sentence.create(sentences_params)
    if sentence
      render json: {sentence: sentence, entities: sentence.entities}
    else
      render json: sentence.errors
    end
  end

  def show
    if sentence
      render json: {sentence: sentence, entities: sentence.entities}
    else
      render json: sentence.errors
    end
  end

  def update
    if sentence.update(sentences_params)
      render json: {sentence: sentence, entities: sentence.entities}
    else
      render json: sentence.errors
    end
  end

  def destroy
    sentence&.destroy
    render json: { message: 'sentence destroyed!' }
  end

  private

  def sentences_params
    params.permit(:text)
  end

  def sentence
    Sentence.find(params[:id])
  end
end
