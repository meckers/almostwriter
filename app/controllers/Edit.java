package controllers;

import models.Box;
import models.Page;
import models.PageStore;
import play.mvc.Controller;

import java.awt.image.BufferedImage;
import java.util.List;
import java.util.UUID;

public class Edit extends Controller {

    public static void createPageAjax(Page page) {

        try{
            //Page page = new Page();
            //page.set_id(params.get("id"));
            //page.setTitle(params.get("title"));
            //String test = params.get("tags");
            String rev = PageStore.save(page);

            renderJSON("{\"revision\": \"" + rev + "\"}");
        }
        catch(Exception ex) {
            renderJSON("{\"error\": \"" + ex.getMessage() + "\"}");
        }
    }
}
