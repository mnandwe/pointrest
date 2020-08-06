## NOTES
* Hasn't been tested, it's more than likely buggy

### Scaling
* Considerations for scaling:
  * Using CDNs to reduce server load
  * Caching will reduce the number of reads 
  * Scaling the server
  * Have distributed database based on where people are marking from

* Mobile applications:
  * I've build the server as a rest api which makes it flexible for use across different frontends
  * The client is an Angular app and can be adapted to allow for building with electron to generate other apps.