package models;

import org.lightcouch.CouchDbClient;
import org.lightcouch.Response;

import javax.print.attribute.standard.DateTimeAtCompleted;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class PageStore {

    public static Page get(String pageId) {
        CouchDbClient client = new CouchDbClient();
        Page page = client.find(Page.class, pageId);
        return page;
    }

    public static List<Page> getLatest(Integer limit) {
        try {
            CouchDbClient client = new CouchDbClient();
            List<Page> pages = client.view("list/latest").descending(true).limit(limit).includeDocs(true).query(Page.class);
            return pages;
        }
        catch(Exception ex) {
            return new ArrayList<Page>();
        }
    }

    public static String update(Page page) {

        String result = "";

        try {
            CouchDbClient client = new CouchDbClient();
            Response response = client.update(page);
            result = response.toString();
        }
        catch (Exception ex) {
            result = ex.getMessage();
        }

        return result;
    }

    public static String save(Page page) {

        String result = "";

        try {
            CouchDbClient client = new CouchDbClient();
            Response response;
            if (client.contains(page.get_id())) {
                //response = client.update(page);
                response = updatePage(page);

            }
            else {
                Date now = new Date();
                page.setTimestamp(now);
                response = client.save(page);
            }
            result = response.getRev();
        }
        catch (Exception ex) {
            result = ex.getMessage();
        }

        return result;
    }

    private static Response updatePage(Page modifiedPage) {
        Response response;
        try {
            CouchDbClient client = new CouchDbClient();
            Page existingPage = get(modifiedPage.get_id());
            existingPage.setTitle(modifiedPage.getTitle());
            existingPage.setBoxes(modifiedPage.getBoxes());
            response = client.update(existingPage);
            return response;
        }
        catch(Exception ex) {
            return null;
        }
    }

}
