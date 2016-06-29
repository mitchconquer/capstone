# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

categories = [
 { name: "Uncategorized"},
 { name: "News"},
 { name: "English"},
 { name: "中文（繁體）"},
 { name: "中文（简体）"},
 { name: "Tech"},
 { name: "Sports"},
 { name: "Cooking"},
 { name: "Français"}
]

users = [
  { username: "sillygoose", password: "sillygoose" },
  { username: "testy", password: "alwaysbetestin" }
]

feed_sources = [ 
  { title: "紐約時報中文網 國際縱覽", url: "http://cn.nytimes.com/rss/zh-hant/", recommended: "true", image_url: "http://cn.nytimes.com/img/nameplate_zh-hant@2x.png" },
  { title: "ESPN", url: "http://espn.go.com/espn/rss/news", recommended: "true", image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEXMAAD////229vllZXYX1/JAADrra3xysr66enNDQ3++vrNAADwxsb88/P55ub339/opaXTQEDddHT11tbOHBzrsrLijY3PGhrbamrZZGTppqbXXFz99vbRKirXU1Pvvr7UR0fSMzPmmprOIyPiiorSOjrUT0/ccHDefn7uurrOFBTRMDCbHUh7AAAFDElEQVR4nO2a2XbqOgyGw2CGMKSQQKFQxlJo+/7vd5wQuogVxfmz9tlrX/zfZR1ZFlUkWUoQEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEL+CsNnTH05Y4CHa+74/8jEgyem7Uqmm9+NZ7evuPphmHFnFzwObF6iWjJx75p4jDxPWgC7XP88RqTqM53nxzX1FUxeRpUWzkLgAOEl035u42evyzi3cArITI5VFnYR9YPvVPkaPDRGfD8XJHP/5csxN2SnKBXZQcpxTqmjvmIycYWFJ2gjq/x7gCnHSc91AGVWuoV7ZJ+FsUEO1I0zt+eagzJjNaACMcuytPtsQd04XwZ0LctUd9MI2WcORqZm2HfBLFChRDMwgdLhJjBvqGqcyFrYR4XOmoUXZJfwCL63zUgthMOZauEnsstkBL63zUi9FBZ61SyEYtbAqoa8uhk2Yp9RmYFmIBb7+01+XJwXE2xQmbZmYbA6dWpzsml1CDzfkNOnrZZBNae5amF6zasN+nxDmqjRDSTknydZd+uztgKftZ7c/Ty/Ge+Ikm73YOPZxvnbxjm3K7MZahbC6bBuRyDs3x5GmiUW+PdGVlpOuhPpcqA1MuB0OAJ6HmHec0GraJsORXkfFYOluIRHWjDFlC8wC7OzpkrAKvpmAtF42BctEK6nXg8x5SfUwuw+GQRg3+ozMJ0S1c/HFusvqoVQCW/rBgPef98DvO1xLnGtj6KFver150ch1Qfc496s5h9MZFrWeCi2YeQproqBQQLp/rZ7f8DHRZtKqUOKxsPM43oHzUKoMRhmm2Mv4ta66QqSmCRB8OpaEBaTwdC9wm3V+y/WLE193YBNsAOaDtdWy8X9GbfF1+zoRoOJZiDW0erfYz924AOYkVIDZeOh/XfSYZ6TzA5pz1kLx7UfDhejTMdVUf3At/5koYhJ+57K4jeemcPyTXnIDYLbn8CIdLgol+2s89maL93JcAekw0u9S6b6jJuo0npRdHZ8CsyXK7H0pMOlZuHIVT5RY1I9hFPYYl1MkbbwLq2uZ12dWhzdmKV2rOpa6DqFjU5H9zht7Qf/Rfj1u2ddHa6JjpZfuQfXKWxNI6aN+hAlR6S7VlFCloHqViK3fXmaPb5+UOI6xYeR2WXhs1BUWk46FGVgqAYaEbMG476K/Xcke305Q9STVyQsPBBlnuNavvUnC9F0CA05MmYlg461x0BZ5jnpTqzrt0NoBtEx+HzblrIyHR48BkrX6hWThfD7nuoV6OwQHcy2pmWdnR+fhb7boVhX/V6U8JVs8MFsOs0V6TD7nqPSQlHmbTzrqt+LEr6KsOyV8vFR8u5GHgMDI1yr+LmM9Hv1cxpsdvjaYDA7KgkLsS+UysaDMxsU6VLdSpToVaTNUuQ7pRQb42TY8KZD6deedf12CN304pJXyocttuTc35sOhV87nwMd3fU/lA7tTw9+p9RambLvddSm0QPh1/2iBfXLQLhZCraUVlmdJ8LGzmOgjNi+dKj7PdSpvYHpsP1+b3qIplHFR3Z3CzzNUKBZKkv4KjbIkCOMV7nWs5uRJuqU6GGBcK1iugPSYVLvK9yco3WfTGA6qKTd7r9dj7+/6sXZJvLenczeOVc0q16f+rwCZlhJs8+1CSGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCH/Pv8Bv+NYVfEcMMsAAAAASUVORK5CYII=" },
  { title: "Science Daily", url: "https://rss.sciencedaily.com/all.xml", recommended: "true", image_url: "https://www.sciencedaily.com/images/sd-logo.png" }
  { title: "The New Yorker", url: "http://www.newyorker.com/feed/everything", recommended: "true", image_url: "http://www.newyorker.com/wp-content/assets/dist/img/header_graphics/nyr-logo.svg" }
]

users.each do |user|
  User.create!(user)
end
categories.each do |cat|
  Category.create!(cat)
end

feed_sources.each do |feed|
  FeedSource.create!(feed)
end

all_cats = Category.all
all_feed_sources = FeedSource.all

10.times do
  CategoriesFeedSource.create!({feed_source_id: all_feed_sources.sample.id, category_id: all_cats.sample.id })
end