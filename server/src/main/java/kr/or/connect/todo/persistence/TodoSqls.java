package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	
	static final String SELECT_BY_ID =
			"SELECT id, todo, completed, date FROM todo where id=:id ORDER BY date DESC";
	
	static final String SELECT_ALL =
			"SELECT * FROM todo ORDER BY date DESC";
	
	static final String UPDATE = 
			"UPDATE todo SET completed=:completed where id=:id";

	static final String COUNT_TODO = 
			"SELECT completed FROM todo WHERE completed = 0";

	static final String DELETE_BY_COMPLETED = 
			"DELETE FROM TODO WHERE completed= true";
}
