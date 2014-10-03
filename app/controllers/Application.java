package controllers;

import org.apache.commons.compress.utils.IOUtils;
import play.*;
import play.mvc.*;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URL;
import java.util.*;
import java.util.List;

import models.*;

import javax.imageio.ImageIO;

public class Application extends Controller {
       /*
    public static void index() {
        List<Page> latestPages = PageStore.getLatest(5);
        render(latestPages);
    }
     */
    public static void index() {
        render();
    }

    public static void create() {
        String id = "";
        UUID uuid = UUID.randomUUID();
        id = uuid.toString().substring(0, 5);
        redirect("/" + id);
    }

    public static void content(String id) {
        render(id);
    }

    public static void load(String id) {
        //Page page = null;
        Object response;

        try {
            response = PageStore.get(id);
        }
        catch(Exception ex) {
            response = ex.getMessage();
        }

        renderJSON(response);
    }

    public static void addwebimage() {
        try {
            String pageId = params.get("pageId");
            String weburl = params.get("weburl");
            // fetch and store image on server. then return local url.
            URL url = new URL(weburl);
            Image image = ImageIO.read(url);
            UUID uuid = UUID.randomUUID();
            String id = uuid.toString().substring(0, 5);
            File path = UploadPathHelpers.getPath(pageId, id);
            String publicPath = UploadPathHelpers.getPublicPath(pageId, id);
            BufferedImage bi = (BufferedImage)image;
            File f = new File(path.getAbsolutePath());
            ImageIO.write(bi, "jpg", f);
            renderJSON("{\"url\": \"" + publicPath + "\"}");
        }
        catch(Exception ex) {
            renderJSON("{\"error\": \"" + ex.getMessage() + "\"}");
        }

    }

    public static void save() {

    }

}