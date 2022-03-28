class CreateEntities < ActiveRecord::Migration[6.1]
  def change
    create_table :entities do |t|
      t.string :text
      t.string :type

      t.timestamps
    end
  end
end
