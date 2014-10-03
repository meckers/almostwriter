package models;

import play.Play;

import java.io.File;

public class UploadPathHelpers {
    public static String getPublicPath(String pageId, String fileId) {
        return File.separator + "public/uploads"+ File.separator + pageId + File.separator + fileId + ".jpg";
    }

    public static File getPath(String pageId, String fileId) {
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
}
