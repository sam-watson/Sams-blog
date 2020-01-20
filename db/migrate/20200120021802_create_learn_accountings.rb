class CreateLearnAccountings < ActiveRecord::Migration[6.0]
  def change
    create_table :learn_accountings do |t|
      t.string :note
      t.text :details
      t.string :parent_note

      t.timestamps
    end
  end
end
