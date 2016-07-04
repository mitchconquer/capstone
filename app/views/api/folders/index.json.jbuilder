@folders.each do |folder|
  json.set! folder.id do
    json.partial! "folder", folder: folder
  end
end