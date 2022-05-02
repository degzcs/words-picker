class Api::V1::EntitiesController < ApplicationController
  def create
    entity = sentence.entities.create(entities_params)
    if entity
      render json: entity
    else
      render json: entity.errors
    end
  end

  def update
    if entity.update(entities_params)
      render json: entity
    else
      render json: entity.errors
    end
  end

  def bulk_entities_update
    entities = bulk_params[:entities].map {|entity_attrs| Entity.new(entity_attrs) }
    sentence.entities = entities

    render json: {entities: sentence.reload.entities}
  end

  def destroy
    entity&.destroy
    render json: { message: 'entity destroyed!' }
  end

  private

  def entities_params
    params.permit(:text, :type)
  end

  def bulk_params
    params.permit(entities: [:id, :text, :type])
  end

  def entity
    Entity.find(params[:id])
  end

  def sentence
    Sentence.find(params[:sentence_id])
  end
end
