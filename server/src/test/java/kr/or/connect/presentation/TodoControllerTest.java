package kr.or.connect.presentation;

import static org.junit.Assert.fail;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;


import kr.or.connect.todo.TodoApplication;


@RunWith(SpringRunner.class)
@ContextConfiguration(classes=TodoApplication.class)
@WebAppConfiguration
public class TodoControllerTest {

	@Autowired
	WebApplicationContext wac;
	MockMvc mvc;
	
	@Before
	public void setUp(){
		this.mvc = webAppContextSetup(this.wac)
				.alwaysDo(print(System.out))
				.build();
	}	

	@Test
	public void testCreate() throws Exception{	
		mvc.perform(
			post("/api/todos")
				.param("todo", "JUnit Test")
			)
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.id").exists())
			.andExpect(jsonPath("$.todo").value("JUnit Test"))
			.andExpect(jsonPath("$.completed").value(0))
			.andExpect(jsonPath("$.date").exists());
	
	}
	
	@Test
	public void testModifyCompleted() throws Exception {
		mvc.perform(
			put("/api/todos/1")
		)
		.andExpect(status().isNoContent());	
	}

	@Test
	public void testRemove() throws Exception {
		mvc.perform(
			delete("/api/todos/1")
		)
		.andExpect(status().isNoContent());
	}

}