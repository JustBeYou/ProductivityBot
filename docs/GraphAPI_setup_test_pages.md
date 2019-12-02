How to setup test user and pages to work with my bot?
===

This was a tricky job because of few reasons:
1. GDPR scandal limited unreviewed apps capabilities
2. Developer dashboard lacks of configuration features in many aspects
3. The API docs lacks of examples/enough routes
4. The API is buggy and filled with workarounds
5. The API changed often in last few years, so there isn't much help on the web

The actual setup:
1. Create the application in developer dashboard
2. Go to Roles > Test Users
3. Create a test user, change its password and grant the app all permissions for it (click on `Edit` and you will see the options)
4. Get the user access token. (Again, click on `Edit`)
5. Use the API explorer to create a page associated with the user. Go to [here](https://developers.facebook.com/tools/explorer/?method=POST&path=me%2Faccounts&version=v5.0&name=[PAGE%20NAME]&category_enum=MEDIA&about=Some%20text&picture=[URL%20TO%20AN%20IMAGE]&cover_photo=%7B%22url%22%3A%20%22[URL%20TO%20AN%20IMAGE]%22%7D&classic=0) for a template and fill the data. Don't forget to set your application and the user token of the test user.
6. Use the API explorer again, but this time to see the roles of the test user. Template [here](https://developers.facebook.com/tools/explorer/?method=GET&path=me%2Faccounts&version=v5.0&classic=0)
```json
Example response
{
  "data": [
    {
      "access_token": "page access token",
      "category": "Performance Art",
      "category_list": [
        {
          "id": "123456789",
          "name": "Performance Art"
        }
      ],
      "name": "Test User",
      "id": "987654321",
      "tasks": [
        "ANALYZE",
        "ADVERTISE",
        "MODERATE",
        "CREATE_CONTENT",
        "MANAGE"
      ]
    },
}
```
7. In the end paste the following link in your browser after filling the data `https://graph.facebook.com/v2.6/me/subscribed_apps?method=POST&access_token=[PAGE ACCESS TOKEN]&subscribed_fields=[TAKE FROM https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps/]` to subscribe to the page events. 
8. Don't forget to setup your messenger webhooks in the developer dashboard and now you're done. You should be able to receive requests when a test user messages your bot and you should be able to respond. 
