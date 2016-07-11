@read_feed_records.each do |read_feed_record|
  json.set! :readFeedRecordId, read_feed_record.id
end