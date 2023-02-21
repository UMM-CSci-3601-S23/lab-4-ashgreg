package umm3601.todo;

import java.util.ArrayList;

import org.bson.UuidRepresentation;
import org.mongojack.JacksonMongoCollection;

import com.mongodb.client.MongoDatabase;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;

public class TodoController {

  private final JacksonMongoCollection<Todo> todoCollection;
  public TodoController(MongoDatabase database) {
    todoCollection = JacksonMongoCollection.builder().build(
      database,
      "todos",
      Todo.class,
      UuidRepresentation.STANDARD);
  }

  public void getTodos(Context ctx) {
    // Bson combinedFilter = constructFilter(ctx);
    // Bson sortingOrder = constructSortingOrder(ctx);

    // All three of the find, sort, and into steps happen "in parallel" inside the
    // database system. So MongoDB is going to find the todos with the specified
    // properties, return those sorted in the specified manner, and put the
    // results into an initially empty ArrayList.
    ArrayList<Todo> matchingTodos = todoCollection.find()
      //.find(combinedFilter)
      //.sort(sortingOrder)
      .into(new ArrayList<>());

    // Set the JSON body of the response to be the list of todos returned by the database.
    // According to the Javalin documentation (https://javalin.io/documentation#context),
    // this calls result(jsonString), and also sets content type to json
    ctx.json(matchingTodos);

    // Explicitly set the context status to OK
    ctx.status(HttpStatus.OK);
  }

}
