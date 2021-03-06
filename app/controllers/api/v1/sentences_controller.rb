class Api::V1::SentencesController < ApplicationController
  def index
    # TODO use ActiveRecord serializer
    # TODO add pagination
    sentences = Sentence.all
    serialized_sentences = sentences.map do |sentence|
      { sentence: sentence, entities: sentence.entities }
    end
    if sentences
      render json: serialized_sentences
    else
      render json: sentences.errors
    end
  end

  def create
    sentence = Sentence.create(sentences_params)
    if sentence
      render json: { sentence: sentence, entities: sentence.entities }
    else
      render json: sentence.errors
    end
  end

  def show
    if sentence
      render json: { sentence: sentence, entities: sentence.entities }
    else
      render json: sentence.errors
    end
  end

  def update
    if sentence.update(sentences_params)
      render json: { sentence: sentence, entities: sentence.entities }
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
