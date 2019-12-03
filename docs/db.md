Database
===

## users
* `id`: user ID (primary key)
* `facebook_user_app_id`: user ID from app
* `facebook_user_page_id`: user ID from page messages 
* `facebook_oauth_id`: temporary ID got from facebook OAuth (null after finding app id)
* `activation_code`: activation code (null after activation)
* `activated`: true/false
* `level`: low, medium or high
* `status`: true/false
* `message`: Any string
