package controllers;

import org.apache.commons.compress.utils.IOUtils;
import play.Logger;
import play.Play;
import play.data.FileUpload;
import play.data.parsing.DataParser;
import play.mvc.Controller;

import javax.swing.text.Document;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class Upload extends Controller{


    public static void upload() {
        try {
            UUID uuid = UUID.randomUUID();
            String id = uuid.toString().substring(0, 5);
            String pageId = params.get("pageId");
            play.data.Upload upload;

            File path = getPath(pageId, id);
            String publicPath = getPublicPath(pageId, id);

            List<Object> uploadArgs = (List<Object>)request.args.get("__UPLOADS");
            if (uploadArgs != null && uploadArgs.size() > 0) {
                upload = (play.data.Upload)uploadArgs.get(0);
                if(upload.asFile() != null && upload.getContentType().startsWith("image/")) {
                    FileInputStream input = new FileInputStream(upload.asFile());
                    FileOutputStream moveTo = new FileOutputStream(path);
                    IOUtils.copy(input, moveTo);
                }
            }
            //renderJSON("{\"id\":\"" + id + "\", \"pageId\":\"" + pageId + "\"}");
            renderJSON("{\"path\": \"" + publicPath + "\"}");
        }
        catch (Exception ex) {
            renderJSON("{\"error\":\"" + ex.getMessage() + "\"}");
        }
    }

    private static String getPublicPath(String pageId, String fileId) {
        return File.separator + "public/uploads"+ File.separator + pageId + File.separator + fileId + ".jpg";
    }

    private static File getPath(String pageId, String fileId) {
        String publicPath = File.separator + "public/uploads"+ File.separator + pageId;
        String fullTarget = Play.getFile("").getAbsolutePath() + publicPath;
        String filePath = fullTarget + File.separator + fileId + ".jpg";
        File folder = new File(fullTarget);
        if (!folder.exists()) {
            folder.mkdir();
        }
        File file = new File(filePath);
        return file;
    }

                    /*
    public static void upload(String qqfile) {
        if (request.isNew) {

            FileOutputStream moveTo = null;

            Logger.info("Name of the file %s", qqfile);
            // Another way I used to grab the name of the file
            //String filename = request.headers.get("x-file-name").value();

            Logger.info("Absolute on where to send %s", Play.getFile("").getAbsolutePath() + File.separator + "uploads" + File.separator);
            try {

                InputStream data = request.body;


                moveTo = new FileOutputStream(new File(Play.getFile("").getAbsolutePath()) + File.separator + "uploads" + File.separator + "trosor.jpg");
                IOUtils.copy(data, moveTo);

            } catch (Exception ex) {

                // catch file exception
                // catch IO Exception later on
                renderJSON("{success: false}");
            }

        }

        renderJSON("{success: true}");
    }
             */
}
