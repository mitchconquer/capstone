@read_feed_records.each do |read_feed_record|
  json.set! read_feed_record.feed_item_id, read_feed_record.id
end