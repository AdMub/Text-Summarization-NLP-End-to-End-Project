import os
import urllib.request as request
import zipfile
from src.logging import logger
from src.utils.common import get_size
from pathlib import Path
from src.entity import DataIngestionConfig


class DataIngestion:
    def __init__(self, config: DataIngestionConfig):
        self.config = config

    def download_file(self):
        if not os.path.exists(self.config.local_data_file):
            filename, headers = request.urlretrieve(
                url=self.config.source_URL,
                filename=self.config.local_data_file
            )
            logger.info(f"{filename} downloaded! with following info: \n{headers}")
        else:
            logger.info(f"File already exists of size: {get_size(Path(self.config.local_data_file))}")

    def extract_zip_file(self):
        """
        Extracts the zip file into the data directory
        Handles invalid Windows filenames + directories
        """
        unzip_path = Path(self.config.unzip_dir)
        unzip_path.mkdir(parents=True, exist_ok=True)

        with zipfile.ZipFile(self.config.local_data_file, 'r') as zip_ref:
            for member in zip_ref.namelist():
                # Sanitize bad Windows characters
                safe_name = member.replace(":", "_").replace("?", "_").replace("*", "_").replace("|", "_")

                target_path = unzip_path / safe_name

                if safe_name.endswith("/"):
                    # It's a directory → create it
                    target_path.mkdir(parents=True, exist_ok=True)
                else:
                    # Ensure parent dirs exist
                    target_path.parent.mkdir(parents=True, exist_ok=True)
                    # Extract file content
                    with zip_ref.open(member) as source, open(target_path, "wb") as target:
                        target.write(source.read())

        logger.info(f"Extraction completed at: {unzip_path}")
